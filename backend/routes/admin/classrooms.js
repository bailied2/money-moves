const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

const getRandomString = require("../../random_string.js");

const authenticateToken = require("../../authMiddleware.js");

// GET / - Get all classrooms
const getClassrooms = (req, res) => {
  const query = "SELECT * FROM classroom";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching classrooms:", err);
      return res.status(500).send({ error: "Failed to fetch classrooms" });
    }
    res.send({ data: results });
  });
};

// GET /teacher - Get all classrooms with a specific teacher id
const getClassroomsByTeacher = (req, res) => {
  // Logs for debugging
  console.log("\n*** getClassroomsByTeacher ***");
  console.log(req.user);

  // Get user_id from info attached by middleware
  const user_id = req.user.id;

  const query = "SELECT * FROM classroom WHERE fk_teacher_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching classrooms:", err);
      return res.status(500).json({ error: "Failed to fetch classrooms" });
    }
    res.json({ classrooms: results });
  });
};

// GET /student - Get all classrooms the user is a student in
/*
 * This function assumes the request has already been through the authenticateToken
 * middleware, meaning that it has been attached with the current user's info.
 */
const getClassroomsByStudent = (req, res) => {
  // Logs for debugging
  console.log("getClassroomsByStudent");
  console.log(req.user);

  // Get user_id from info attached by middleware
  const user_id = req.user.id;

  const query =
    "SELECT classroom.*, COUNT(student.id) AS num_students FROM student INNER JOIN classroom ON student.fk_classroom_id = classroom.id WHERE student.fk_user_id = ? GROUP BY classroom.id";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching classrooms:", err);
      return res.status(500).json({ error: "Failed to fetch classrooms" });
    }
    console.log(results);
    res.json({ classrooms: results });
  });
};

// GET /:id - Get a single classroom by id
const getClassroomById = (req, res) => {
  console.log("\n*** getClassroomById ***");
  const classroomId = req.params.id;
  console.log(`  classroom_id: ${classroomId}`);
  const query = "SELECT * FROM classroom WHERE id = ?";
  db.query(query, [classroomId], (err, results) => {
    if (err) {
      console.error("Error fetching classroom:", err);
      return res.status(500).json({ error: "Failed to fetch classroom" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }
    res.json({ classroom: results[0] });
  });
};

// POST / - Create a new classroom
const createClassroom = (req, res) => {
  // Get teacher_id from info attached by middleware
  const teacher_id = req.user.id;
  // Extracting name, start and end dates from the request body
  const { class_name, start_date, end_date } = req.body;

  const insertClassroom = () => {
    const class_code = getRandomString(7);
    const query =
      "INSERT INTO classroom (class_name, fk_teacher_id, start_date, end_date, class_code) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [class_name, teacher_id, start_date, end_date, class_code],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            // If duplicate class_code, try again
            console.warn(
              `Duplicate class_code ${class_code} detectted. Retrying...`
            );
            return insertClassroom();
          }
          console.error("Error creating classroom:", err);
          return res.status(500).send({ error: "Failed to create classroom" });
        }
        res.json({
          data: `Classroom created successfully with ID ${result.insertId}`,
          classroom: {
            id: result.insertId,
            class_name,
            start_date,
            end_date,
            num_students: 0,
            class_code,
          },
        });
      }
    );
  };
};

// PUT /:id - Update a classroom by id
const updateClassroom = (req, res) => {
  const classroomId = req.params.id;
  const { name, teacher_id } = req.body; // Extracting updated name and teacher_id from the request body
  const query = "UPDATE classroom SET name = ?, teacher_id = ? WHERE id = ?";
  db.query(query, [name, teacher_id, classroomId], (err, result) => {
    if (err) {
      console.error("Error updating classroom:", err);
      return res.status(500).send({ error: "Failed to update classroom" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Classroom not found" });
    }
    res.send({ data: `Classroom with ID ${classroomId} updated` });
  });
};

// DELETE /:id - Delete a classroom by id
const deleteClassroom = (req, res) => {
  const classroomId = req.params.id;
  const query = "DELETE FROM classroom WHERE id = ?";
  db.query(query, [classroomId], (err, result) => {
    if (err) {
      console.error("Error deleting classroom:", err);
      return res.status(500).send({ error: "Failed to delete classroom" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Classroom not found" });
    }
    res.send({ data: `Classroom with ID ${classroomId} deleted` });
  });
};

// Routes definition using the functions above
router.get("/", getClassrooms); // Get all classrooms
router.get("/teacher", authenticateToken, getClassroomsByTeacher); // Get all classrooms tied to a particular teacher's user ID.
router.get("/student", authenticateToken, getClassroomsByStudent); // Get all that a particular student is enrolled in.
router.get("/:id", getClassroomById); // Get a classroom by ID
router.post("/", authenticateToken, createClassroom); // Create a classroom
router.put("/:id", updateClassroom); // Update a classroom by ID
router.delete("/:id", deleteClassroom); // Delete a classroom by ID

module.exports = router;
