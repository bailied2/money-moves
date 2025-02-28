const express = require('express');
const router = express.Router();

// Controller functions 
const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
} = require('../controllers/classroomController');

// Routes
router.get('/', getClassrooms);
router.get('/:id', getClassroomById);
router.post('/', createClassroom);
router.put('/:id', updateClassroom);
router.delete('/:id', deleteClassroom);

module.exports = router;
