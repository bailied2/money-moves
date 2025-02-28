const express = require('express');
const router = express.Router();

// Controller functions 
const {
  getYearEnds,
  getYearEndById,
  createYearEnd,
  updateYearEnd,
  deleteYearEnd
} = require('../controllers/yearEndController');

// Routes
router.get('/', getYearEnds);
router.get('/:id', getYearEndById);
router.post('/', createYearEnd);
router.put('/:id', updateYearEnd);
router.delete('/:id', deleteYearEnd);

module.exports = router;
