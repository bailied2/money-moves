// routes.js
const express = require('express');
const router = express.Router();

// Define the route handler functions

// GET / - Get all classrooms
const getClassrooms = (req, res) => {
  //  db query logic here
  res.send({ data: "here's your classrooms data" });
};

// GET /:id - Get a single classroom by id
const getClassroomById = (req, res) => {
  const classroomId = req.params.id;
  // Your database query logic here
  res.send({ data: `here's the classroom data for ID: ${classroomId}` });
};

// POST / - Create a new classroom
const createClassroom = (req, res) => {
  // Your database insert logic here
  res.send({ data: "classroom created successfully" });
};

// PUT /:id - Update a classroom by id
const updateClassroom = (req, res) => {
  const classroomId = req.params.id;
  // Your database update logic here
  res.send({ data: `classroom with ID ${classroomId} updated` });
};

// DELETE /:id - Delete a classroom by id
const deleteClassroom = (req, res) => {
  const classroomId = req.params.id;
  // Your database delete logic here
  res.send({ data: `classroom with ID ${classroomId} deleted` });
};

// Routes definition using the functions above

router.get('/', getClassrooms);                   // Get all classrooms
router.get('/:id', getClassroomById);             // Get a classroom by ID
router.post('/', createClassroom);                // Create a classroom
router.put('/:id', updateClassroom);             // Update a classroom by ID
router.delete('/:id', deleteClassroom);          // Delete a classroom by ID

module.exports = router;
