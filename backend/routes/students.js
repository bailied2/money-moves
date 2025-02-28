const express = require('express');
const router = express.Router();

// Controller functions 
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  addStudentToClassroom,
  removeStudentFromClassroom
} = require('../controllers/studentController');

// Routes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

// Add or remove students from classrooms
router.post('/:classroomId', addStudentToClassroom);
router.delete('/:classroomId/:studentId', removeStudentFromClassroom);

module.exports = router;
