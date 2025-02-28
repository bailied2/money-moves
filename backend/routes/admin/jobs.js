const express = require('express');
const router = express.Router();

// Controller functions 
const {
  assignJobToStudent,
  removeJobFromStudent
} = require('../controllers/studentJobController');

// Routes
router.post('/:studentId/:jobId', assignJobToStudent);
router.delete('/:studentId/:jobId', removeJobFromStudent);

module.exports = router;
