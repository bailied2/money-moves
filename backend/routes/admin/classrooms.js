const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

const getRandomString = require("../../random_string.js");

const authenticateToken = require("../../authMiddleware.js");

// GET / - Get all classrooms
const getClassrooms = async (req, res) => {
  const query = `SELECT classroom.*, COUNT(student.id) AS num_students 
  FROM student
  RIGHT JOIN classroom
  ON student.fk_classroom_id = classroom.id 
  GROUP BY classroom.id`;
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching classrooms:", err);
  //     return res.status(500).send({ error: "Failed to fetch classrooms" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [classrooms] = await db.execute(query);
    res.json({ classrooms });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

// GET /teacher - Get all classrooms with a specific teacher id
const getClassroomsByTeacher = async (req, res) => {
  // Logs for debugging
  console.log("\n*** getClassroomsByTeacher ***");
  console.log(req.user);

  // Get user_id from info attached by middleware
  const user_id = req.user.id;

  const query = `SELECT classroom.*, COUNT(student.id) AS num_students 
  FROM student
  RIGHT JOIN classroom
  ON student.fk_classroom_id = classroom.id 
  WHERE classroom.fk_teacher_id = ? 
  GROUP BY classroom.id`;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ classrooms: results });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

// GET /student - Get all classrooms the user is a student in
/*
 * This function assumes the request has already been through the authenticateToken
 * middleware, meaning that it has been attached with the current user's info.
 */
const getClassroomsByStudent = async (req, res) => {
  // Logs for debugging
  console.log("\n*** getClassroomsByStudent ***");
  console.log(req.user);

  // Get user_id from info attached by middleware
  const user_id = req.user.id;

  const query = `SELECT classroom.*, COUNT(student.id) AS num_students 
  FROM student
  LEFT JOIN classroom
  ON student.fk_classroom_id = classroom.id 
  WHERE student.fk_user_id = ? 
  GROUP BY classroom.id`;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ classrooms: results });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

// GET /:id - Get a single classroom by id
const getClassroomById = async (req, res) => {
  console.log("\n*** getClassroomById ***");
  const classroomId = req.params.id;
  console.log(`  classroom_id: ${classroomId}`);
  const query = "SELECT * FROM classroom WHERE id = ?";
  // db.query(query, [classroomId], (err, results) => {
  //   if (err) {
  //     console.error("Error fetching classroom:", err);
  //     return res.status(500).json({ error: "Failed to fetch classroom" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).json({ error: "Classroom not found" });
  //   }
  //   res.json({ classroom: results[0] });
  // });
  try {
    const [results] = await db.execute(query, [classroomId]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }
    res.json({ classroom: results[0] });
  } catch (error) {
    console.error("Error fetching classroom:", error);
    return res.status(500).json({ error: "Failed to fetch classroom" });
  }
};

// POST / - Create a new classroom
const createClassroom = async (req, res) => {
  // Get teacher_id from info attached by middleware
  const teacher_id = req.user.id;
  // Extracting name, start and end dates from the request body
  const { class_name, start_date, end_date } = req.body;

  // Debug logs
  console.log("\n*** createClassroom ***");
  console.log(`
    teacher_id: ${teacher_id}
    class_name: ${class_name}
    start_date: ${start_date}
    end_date: ${end_date}`);

  const insertClassroom = async () => {
    const class_code = getRandomString(7);
    console.log(`    class_code: ${class_code}`);
    const insertClassroomQuery =
      "INSERT INTO classroom (class_name, fk_teacher_id, start_date, end_date, class_code) VALUES (?, ?, ?, ?, ?)";
    const insertYearEndQuery =
      "INSERT INTO year_end (fk_classroom_id, end_date, savings_apr) VALUES (?, TIMESTAMP'1970-01-01 00:00:00', 0)";
    try {
      const connection = await db.getConnection();
      // Begin the database transaction (so changes are only saved if all are successful)
      await connection.beginTransaction();
      try {
        const [insertedClassroom] = await connection.execute(
          insertClassroomQuery,
          [class_name, teacher_id, start_date, end_date, class_code]
        );
        console.log(insertedClassroom.insertId);
        const classroom = {
          id: insertedClassroom.insertId,
          fk_teacher_id: teacher_id,
          class_name,
          start_date,
          end_date,
          class_code,
          num_students: 0,
        };
        const [insertedYearEnd] = await connection.execute(insertYearEndQuery, [
          classroom.id,
        ]);
        await connection.commit(); // Commit database transaction
        connection.release(); // Release the connection back to the pool
        res.json({
          message: `Classroom ${class_name} created successfully!`,
          classroom,
        });
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          // If duplicate class_code, try again
          console.warn(
            `Duplicate class_code ${class_code} detected. Retrying...`
          );
          return insertClassroom();
        }
        console.error("Error creating classroom:", error);
        // Rollback changes since start of transaction
        await connection.rollback();
        connection.release(); // Release the connection back to the pool
        return res.status(500).json({ error: "Failed to create classroom" });
      }
    } catch (error) {
      console.error("Error creating classroom:", error);
      return res.status(500).json({ error: "Failed to create classroom" });
    }
  };
  // Call insertClassroom()
  insertClassroom();
};

// POST /join/:code - Join a classroom by class code
const joinClassroomByCode = async (req, res) => {
  console.log("\n*** joinClassroomByCode ***");

  const user_id = req.user.id;
  const class_code = req.params.code;
  console.log(" user_id: ", user_id);
  console.log(" class_code: ", class_code);

  const selectClassroomQuery = "SELECT * FROM classroom WHERE class_code = ?";
  const insertStudentQuery =
    "INSERT INTO student (fk_user_id, fk_classroom_id) VALUES (?, ?)";
  try {
    console.log(" Searching for classroom... ");
    const [classroomResults] = await db.execute(selectClassroomQuery, [
      class_code,
    ]);
    if (classroomResults.length === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    console.log(" Classroom found! ");
    const classroom = classroomResults[0];
    console.log(" classroom_id: ", classroom.id);

    const insertedStudent = await db.execute(insertStudentQuery, [
      user_id,
      classroom.id,
    ]);
    console.log(` User {${user_id}} joined classroom {${classroom.id}}`);
    console.log(` with student_id {${insertedStudent.insertId}}`);
    res.json({
      data: `Student successfully joined classroom with student ID ${insertedStudent.insertId}`,
      classroom,
    });
  } catch (error) {
    console.error("Error joining classroom by code:", error);
    return res.status(500).json({ error: "Failed to join classroom" });
  }
};

// PUT /:id - Update a classroom by id
const updateClassroom = async (req, res) => {
  const classroomId = req.params.id;
  const { name, teacher_id } = req.body; // Extracting updated name and teacher_id from the request body
  const query = "UPDATE classroom SET name = ?, teacher_id = ? WHERE id = ?";
  // db.query(query, [name, teacher_id, classroomId], (err, result) => {
  //   if (err) {
  //     console.error("Error updating classroom:", err);
  //     return res.status(500).send({ error: "Failed to update classroom" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Classroom not found" });
  //   }
  //   res.send({ data: `Classroom with ID ${classroomId} updated` });
  // });
  try {
    const [results] = await db.execute(query, [name, teacher_id, classroomId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }
    res.json({ data: `Classroom with ID ${classroomId} updated` });
  } catch (error) {
    console.error("Error updating classroom:", error);
    return res.status(500).json({ error: "Failed to update classroom" });
  }
};

// DELETE /:id - Delete a classroom by id
const deleteClassroom = async (req, res) => {
  const classroomId = req.params.id;
  const query = "DELETE FROM classroom WHERE id = ?";
  // db.query(query, [classroomId], (err, result) => {
  //   if (err) {
  //     console.error("Error deleting classroom:", err);
  //     return res.status(500).send({ error: "Failed to delete classroom" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Classroom not found" });
  //   }
  //   res.send({ data: `Classroom with ID ${classroomId} deleted` });
  // });
  try {
    const [results] = await db.execute(query, [classroomId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }
    res.json({ data: `Classroom with ID ${classroomId} deleted` });
  } catch (error) {
    console.error("Error deleting classroom:", error);
    return res.status(500).json({ error: "Failed to delete classroom" });
  }
};

// GET /classrooms/validate-db - Ensures all classrooms have all necessary database entries
router.post("/validate-db", authenticateToken, async (req, res) => {

  console.log("\n*** POST /classrooms/validate-db ***")
  
  try {
    const connection = await db.getConnection();
    // Begin the database transaction (so changes are only saved if all are successful)
    await connection.beginTransaction();
    try {
      // Get all classrooms
      const [classrooms] = await connection.query("SELECT * FROM classroom");

      // Loop through classrooms
      for (const classroom of classrooms) {
        // Get classroom data
        const selectStudentsQuery = "SELECT * FROM student WHERE fk_classroom_id = ?";
        const selectInvestmentAccountsQuery = "SELECT * FROM investment_account WHERE fk_classroom_id = ?";
        const selectYearEndsQuery = "SELECT * FROM year_end WHERE fk_classroom_id = ?";
        const [students] = await connection.execute(selectStudentsQuery, [classroom.id]);
        const [investment_accounts] = await connection.execute(selectInvestmentAccountsQuery, [classroom.id]);
        const [year_ends] = await connection.execute(selectYearEndsQuery, [classroom.id]);

        // Ensure default year_end is in place
        if (year_ends.length === 0) {
          const insertYearEndQuery = `INSERT INTO year_end (fk_classroom_id, end_date, savings_apr) 
            VALUES (?, TIMESTAMP'1970-01-01 00:00:00', 0)`;
          const [insertedYearEnd] = await connection.execute(insertYearEndQuery, [classroom.id]);
          // If there are already investment accounts somehow,
          if (investment_accounts.length > 0) {
            // Loop through them
            for (const investment_account of investment_accounts) {
              const insertValueQuery = `INSERT INTO investment_values 
                (fk_year_end_id, fk_account_id, share_value)
                VALUES (?, ?, 0)`;
              // And insert a corresponding value
              await connection.execute(insertValueQuery, [insertedYearEnd.insertId, investment_account.id]);
            }
          }
        }
        
        // Loop through students
        for (const student of students) {
          const selectAccountsQuery = "SELECT * FROM account WHERE fk_student_id = ?";
          // Get the current student's accounts
          const [accounts] = await connection.execute(selectAccountsQuery, [student.id]);

          // Ensure student has checking account
          if (!accounts.some((acc) => acc.account_type === 1)) {
            const insertCheckingAccountQuery = "INSERT INTO account (fk_student_id, account_type) VALUES (?, 1)";
            await connection.execute(insertCheckingAccountQuery, [student.id]);
          }
          // Ensure student has checking account
          if (!accounts.some((acc) => acc.account_type === 2)) {
            const insertSavingsAccountQuery = "INSERT INTO account (fk_student_id, account_type) VALUES (?, 2)";
            await connection.execute(insertSavingsAccountQuery, [student.id]);
          }

          // For each investment account in the classroom,
          for (const investment_account of investment_accounts) {
            // Ensure student has a corresponding account
            if (!accounts.some((acc) => acc.fk_investment_account_id === investment_account.id)) {
              const insertAccountQuery = `INSERT INTO account 
              (fk_student_id, account_type, fk_investment_account_id) 
              VALUES (?, 3, ?)`;
              await connection.execute(insertAccountQuery, [student.id, investment_account.id]);
            }
          }
        }
        
        // Ensure each investment account has a corresponding value for each year_end
        for (const investment_account of investment_accounts) {
          const selectValuesQuery = "SELECT * FROM investment_values WHERE fk_account_id = ?";
          // Get yearly values for the current investment account
          const [investment_values] = await connection.execute(selectValuesQuery, [investment_account.id]);
          // Loop through year_ends
          for (const year_end of year_ends) {
            // Check for corresponding value
            if (!investment_values.some((val) => val.fk_year_end_id === year_end.id)) {
              const placeholder_value = investment_values.at(-1)?.share_value || 0;
              const insertValueQuery = "INSERT INTO investment_values (fk_year_end_id, fk_account_id, share_value) VALUES (?, ?, ?)";
              await connection.execute(insertValueQuery, [year_end.id, investment_account.id, placeholder_value]);
            }
          }
        }
      }

      // All changes complete, commit transaction.

      await connection.commit(); // Commit database transaction
      connection.release(); // Release the connection back to the pool
      res.json({
        message: "Classrooms validated successfully!",
      });
    } catch (error) {
      console.error("Error validating classrooms:", error);
      // Rollback changes since start of transaction
      await connection.rollback();
      connection.release(); // Release the connection back to the pool
      return res.status(500).json({ error: "Failed to validate classrooms" });
    }
  } catch (error) {
    console.error("Error validating classrooms:", error);
    return res.status(500).json({ error: "Failed to validate classrooms" });
  }
});

// GET /classrooms/add-defaults - Add some default fees/bonuses, properties, jobs to each classroom
router.post("/add-defaults", authenticateToken, async (req, res) => {

  console.log("\n*** GET /classrooms/add-defaults ***")
  
  try {
    const connection = await db.getConnection();
    // Begin the database transaction (so changes are only saved if all are successful)
    await connection.beginTransaction();
    try {
      // Get all classrooms
      const [classrooms] = await connection.query("SELECT * FROM classroom");

      // Loop through classrooms
      for (const classroom of classrooms) {
        // Get classroom data
        const query = "SELECT * FROM ? WHERE fk_classroom_id = ?";
        const selectFeesBonusesQuery = "SELECT * FROM fees_bonuses WHERE fk_classroom_id = ?";
        const selectJobsQuery = "SELECT * FROM job WHERE fk_classroom_id = ?";
        const selectPropertiesQuery = "SELECT * FROM property WHERE fk_classroom_id = ?";
        const [fees_bonuses] = await connection.execute(selectFeesBonusesQuery, [classroom.id]);
        const [jobs] = await connection.execute(selectJobsQuery, [classroom.id]);
        const [properties] = await connection.execute(selectPropertiesQuery, [classroom.id]);

        // check for default fees/bonuses, jobs, and property
        if (fees_bonuses.length === 0) {
          const query = `INSERT INTO fees_bonuses
          (fk_classroom_id, title, description, amount, icon_class)
          VALUES (?, "Performance Bonus", "Bonus for good performance", 20, ""),
          (?, "Late Fee", "Fee for arriving late", -10, "")`;
          await connection.query(query, [classroom.id, classroom.id]);
        }
        if (jobs.length === 0) {
          const query = `INSERT INTO job 
          (fk_classroom_id, title, description, wage, pay_frequency, pay_day, icon_class, is_trustee) 
          VALUES (?, "Hall Monitor", "Patrol the hallways and keep the peace", 100, "Weekly", "Friday", "", 0),
          (?, "Loan Officer", "Assist the teacher with applying fees/bonuses", 150, "Weekly", "Friday", "", 1)`;
          await connection.query(query, [classroom.id, classroom.id]);
        }
        if (properties.length === 0) {
          const query = `INSERT INTO property
          (fk_classroom_id, title, description, value, rent, maintenance, pay_frequency, icon_class)
          VALUES (?, "Desk", "A simple desk", 100, 20, 5, "Monthly", "")`;
          await connection.query(query, [classroom.id]);
        }
      }

      // All changes complete, commit transaction.

      await connection.commit(); // Commit database transaction
      connection.release(); // Release the connection back to the pool
      res.json({
        message: `Default fee, bonus, jobs, and property added successfully!`,
      });
    } catch (error) {
      console.error("Error adding defaults:", error);
      // Rollback changes since start of transaction
      await connection.rollback();
      connection.release(); // Release the connection back to the pool
      return res.status(500).json({ error: "Failed to add defaults" });
    }
  } catch (error) {
    console.error("Error adding defaults:", error);
    return res.status(500).json({ error: "Failed to add defaults" });
  }
});

// Routes definition using the functions above
router.get("/", getClassrooms); // Get all classrooms
router.get("/teacher", authenticateToken, getClassroomsByTeacher); // Get all classrooms tied to a particular teacher's user ID.
router.get("/student", authenticateToken, getClassroomsByStudent); // Get all that a particular student is enrolled in.
router.get("/:id", getClassroomById); // Get a classroom by ID
router.post("/", authenticateToken, createClassroom); // Create a classroom
router.post("/join/:code", authenticateToken, joinClassroomByCode); // Join a classroom by class_code
router.put("/:id", updateClassroom); // Update a classroom by ID
router.delete("/:id", deleteClassroom); // Delete a classroom by ID

module.exports = router;
