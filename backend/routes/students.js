// students.js
const express = require('express');
const router = express.Router();


// GET /students - Get all student records
const getStudents = (req, res) => {
  //  logic to retrieve all student records from the db
  res.send({ data: "here's all the student records" });
};

// GET /students/:id - Get a specific student record by ID
const getStudentById = (req, res) => {
  const { id } = req.params;
  //  logic to retrieve a specific student record by its ID from the db
  res.send({ data: `here's the student data for ID: ${id}` });
};

// POST /students - Create a new student record
const createStudent = (req, res) => {
  //  logic to create a new student record (insert into the db)
  res.send({ data: "new student record created successfully" });
};

// PUT /students/:id - Update a specific student record by ID
const updateStudent = (req, res) => {
  const { id } = req.params;
  //  logic to update a specific student record by its ID
  res.send({ data: `student record with ID: ${id} updated successfully` });
};

// DELETE /students/:id - Delete a specific student record by ID
const deleteStudent = (req, res) => {
  const { id } = req.params;
  //  logic to delete a specific student record by its ID
  res.send({ data: `student record with ID: ${id} deleted successfully` });
};

// Routes definition using the functions above
router.get('/students', getStudents);              // Get all student records
router.get('/students/:id', getStudentById);       // Get a student record by ID
router.post('/students', createStudent);           // Create a new student record
router.put('/students/:id', updateStudent);        // Update a student record by ID
router.delete('/students/:id', deleteStudent);     // Delete a student record by ID

module.exports = router;
