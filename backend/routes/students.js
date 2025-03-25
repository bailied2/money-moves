const express = require("express");
const router = express.Router();
const db = require("../sample_database.js");

const bcrypt = require("bcrypt");

const getRandomString = require("../random_string.js");
const authenticateToken = require("../authMiddleware.js");

// GET /students - Get all student records
const getStudents = async (req, res) => {
  const query = "SELECT * FROM students";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching student records:", err);
  //     return res.status(500).send({ error: "Failed to fetch student records" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.send({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /students/classroom/:id - Get all students in a particular classroom
const getStudentsByClassroom = async (req, res) => {
  // const user_id = req.user.id;
  const classroom_id = req.params.id;

  // Debug logs
  console.log("\n*** getStudentsByClassroom ***");

  const selectStudentsQuery = `SELECT student.id AS id, 
  user.first_name AS first_name, 
  user.last_name AS last_name
  FROM student
  INNER JOIN user
  ON user.id = student.fk_user_id
  INNER JOIN account
  ON account.fk_student_id = student.id
  WHERE student.fk_classroom_id = ?;`;

  const selectAccountsQuery =
    "SELECT account.*, SUM(transaction.amount) AS balance FROM account INNER JOIN transaction ON transaction.fk_account_id = account.id WHERE fk_student_id = ?";

  const selectInvestmentAccountQuery =
    "SELECT * FROM investment_account WHERE id = ?";

  try {
    const [students] = await db.execute(selectStudentsQuery, [classroom_id]);
    for (const student of students) {
      const [accounts] = await db.execute(selectAccountsQuery, [student.id]);
      student.investment_accounts = [];
      for (const account of accounts) {
        if (account.account_type === 1) {
          // If account is a checking account
          student.checking_account = account;
        } else if (account.account_type === 2) {
          // If account is a savings account
          student.savings_account = account;
        } else if (account.account_type === 3) {
          const [investmentAccountResult] = await db.execute(
            selectInvestmentAccountQuery,
            [account.fk_investment_account_id]
          );
          if (investmentAccountResult.length === 0) {
            return res
              .status(404)
              .json({ error: "Investment account not found" });
          }
          student.investment_accounts.push(investmentAccountResult[0]);
        }
      }
    }
    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /students/:id - Get a specific student record by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM students WHERE id = ?";
  // db.query(query, [id], (err, results) => {
  //   if (err) {
  //     console.error("Error fetching student record by ID:", err);
  //     return res.status(500).send({ error: "Failed to fetch student record" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).send({ error: "Student record not found" });
  //   }
  //   res.send({ data: results[0] });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Student record not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /students - Create a new student record
const createStudent = async (req, res) => {
  const { name, email, classroom_id, balance } = req.body;

  const query =
    "INSERT INTO students (name, email, classroom_id, balance) VALUES (?, ?, ?, ?)";

  try {
    const [results] = await db.execute(query, [
      name,
      email,
      classroom_id,
      balance,
    ]);
    res.json({
      data: `Student record created successfully with ID ${result.insertId}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /students/classroom/:id - Add one or more students to a classroom (for the teacher)
const addStudentsToClassroom = async (req, res) => {
  const user_id = req.user.id;
  // const classroom_id = req.params.id;

  const { classroom, students } = req.body;

  console.log("\n*** addStudentsToClassroom ***");
  console.log(`    classroom id: ${classroom.id}
    class name: ${classroom.class_name}
    students:`);
  for (const student of students) {
    console.log(`      ${student.first_name + " " + student.last_name}
      email: ${student.email}
    ---------`);
  }

  if (user_id !== classroom.fk_teacher_id) {
    console.error(
      "User attempted to add students to classroom they do not teach"
    );
    return res
      .status(500)
      .json({ error: "Failed to add students to classroom" });
  }

  const selectUserQuery = "SELECT * FROM user WHERE email=?";
  const insertUserQuery =
    "INSERT INTO user (first_name, last_name, email, hash, needs_new_password) VALUES (?, ?, ?, ?, 1)";
  const insertStudentQuery =
    "INSERT INTO student (fk_classroom_id, fk_user_id) VALUES (?, ?)";
  const insertAccountQuery =
    "INSERT INTO account (fk_student_id, account_type) VALUES (:student_id, 1), (:student_id, 2)";
  const insertInvestmentAccountQuery =
    "INSERT INTO account (fk_student_id, fk_investment_account_id account_type) VALUES (?, ?, 3)";

  // Get database connection before starting transaction
  try {
    const connection = await db.getConnection();
    // Begin the database transaction (so changes are only saved if all are successful)
    await connection.beginTransaction();
    try {
      // Loop through each student to be added
      for (const student of students) {
        student.fk_classroom_id = classroom.id;
        const [userResults] = await connection.execute(selectUserQuery, [
          student.email,
        ]);
        if (userResults.length === 0) {
          // If no results, email is not associated with an existing user and we must generate one.

          // Generate random password
          const password = getRandomString(7);
          const saltRounds = 10;
          // Hash random password with bcrypt
          const hash = await bcrypt.hash(password, saltRounds);
          // Attempt to insert new user into database
          const [insertedUser] = await connection.execute(insertUserQuery, [
            student.first_name,
            student.last_name,
            student.email,
            hash,
          ]);
          student.fk_user_id = insertedUser.insertId;
        } else {
          // Otherwise, the new student already has a user account.
          console.log(
            `  Found existing user for student with email ${student.email}`
          );
          const user = userResults[0];
          student.fk_user_id = user.id;
          if (
            student.first_name !== user.first_name ||
            student.last_name !== user.last_name
          ) {
            // If the student's first or last name is listed differently on
            // their user account, use those values and set a flag.
            console.log(
              `    Found different name for student, updating name.
            inputted name: ${student.first_name + " " + student.last_name}
            User's first_name: ${user.first_name}
            User's last_name: ${user.last_name}`
            );
            student.first_name = user.first_name;
            student.last_name = user.last_name;
          }
        }
        // Student now has user account, so we can insert the student record
        const [insertedStudent] = await connection.execute(insertStudentQuery, [
          student.fk_classroom_id,
          student.fk_user_id,
        ]);
        // Student has been added to classroom
        student.id = insertedStudent.insertId;
        // Now add checkings and savings account
        const [insertAccountsResults] = await connection.query(
          insertAccountQuery,
          { student_id: student.id }
        );
        if (Array.isArray(classroom.investment_accounts)) {
          // If classroom has investment accounts, we must generate a corresponding
          // account for the student.
          for (const investment_account of classroom.investment_accounts) {
            await connection.query(insertInvestmentAccountQuery, [
              student.id,
              investment_account.id,
            ]);
          }
        }
        // If no error so far, this student was added successfully
        console.log(
          `  Student ${student.id} (${student.first_name} ${student.last_name}) added successfully to Classroom ${classroom.id} (${classroom.class_name})`
        );
        await connection.commit(); // Commit database transaction
        connection.release(); // Release the connection back to the pool
      }
    } catch (error) {
      console.error("Error adding students to classroom:", error);
      // Rollback changes since start of transaction
      await connection.rollback();
      connection.release(); // Release the connection back to the pool
      return res.status(500).json({
        error: "Failed to add students to classroom",
      });
    }
  } catch (error) {
    console.error("Error getting database connection:", error);
    // Rollback changes since start of transaction
    return res
      .status(500)
      .json({ error: "Failed to add students to classroom" });
  }
};

// PUT /students/:id - Update a specific student record by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, classroom_id, balance } = req.body;
  const query =
    "UPDATE students SET name = ?, email = ?, classroom_id = ?, balance = ? WHERE id = ?";
  // db.query(query, [name, email, classroom_id, balance, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating student record:", err);
  //     return res.status(500).send({ error: "Failed to update student record" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Student record not found" });
  //   }
  //   res.send({ data: `Student record with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [
      name,
      email,
      classroom_id,
      balance,
      id,
    ]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Student record not found" });
    }
    res.json({ data: `Student record with ID ${id} updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /students/:id - Delete a specific student record by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM students WHERE id = ?";
  // db.query(query, [id], (err, result) => {
  //   if (err) {
  //     console.error("Error deleting student record:", err);
  //     return res.status(500).send({ error: "Failed to delete student record" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Student record not found" });
  //   }
  //   res.send({ data: `Student record with ID ${id} deleted successfully` });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).send({ error: "Student record not found" });
    }
    res.send({ data: `Student record with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Routes definition using the functions above
router.get("/", getStudents); // Get all student records
router.get("/classroom/:id", authenticateToken, getStudentsByClassroom); // Get all students in a particular classroom
router.get("/:id", getStudentById); // Get a student record by ID
router.post("/", createStudent); // Create a new student record
router.post("/classroom/:id", authenticateToken, addStudentsToClassroom); // Add student(s) to a class
router.put("/:id", updateStudent); // Update a student record by ID
router.delete("/:id", deleteStudent); // Delete a student record by ID

module.exports = router;
