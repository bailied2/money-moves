const express = require('express');
const router = express.Router();

// Controller functions 
const {
  assignPropertyToStudent,
  removePropertyFromStudent
} = require('../controllers/studentPropertyController');

// Routes
router.post('/:studentId/:propertyId', assignPropertyToStudent);
router.delete('/:studentId/:propertyId', removePropertyFromStudent);

module.exports = router;
