const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

const getRandomString = require("../../random_string.js");

const authenticateToken = require("../../authMiddleware.js");

// GET / - Get all classrooms
const getClassrooms = async (req, res) => {
  const query = "SELECT * FROM classroom";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching classrooms:", err);
  //     return res.status(500).send({ error: "Failed to fetch classrooms" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
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

  const query = "SELECT * FROM classroom WHERE fk_teacher_id = ?";

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

  const query =
    "SELECT classroom.*, COUNT(student.id) AS num_students FROM student INNER JOIN classroom ON student.fk_classroom_id = classroom.id WHERE student.fk_user_id = ? GROUP BY student.fk_classroom_id";

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
        const [insertedClassroom] = await connection.execute(insertClassroomQuery, [
          class_name,
          teacher_id,
          start_date,
          end_date,
          class_code,
        ]);
        console.log(insertedClassroom.insertId);
        const classroom = {
          id: insertedClassroom.insertId,
          class_name,
          start_date,
          end_date,
          class_code,
          num_students: 0,
        };
        const [insertedYearEnd] = await connection.execute(insertYearEndQuery, [classroom.id]);
        await connection.commit(); // Commit database transaction
        connection.release(); // Release the connection back to the pool
        res.json({
          message:`Classroom created successfully with ID ${insertedClassroom.insertId}`,
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
      user_id,
      class_code,
    ]);
    if (classroomResults.length === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    console.log(" Classroom found! ");
    const classroom = classroomResults[0];
    console.log(" classroom_id: ", classroom.id);

    const insertedStudent = await db.execute(insertStudentQuery, [
      [user_id, classroom.id],
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
