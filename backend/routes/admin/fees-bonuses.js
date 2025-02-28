const express = require('express');
const router = express.Router();

// Controller 
const {
  getFeesBonuses,
  getFeeBonusById,
  createFeeBonus,
  updateFeeBonus,
  deleteFeeBonus
} = require('../controllers/feesBonusController');

// Routes
router.get('/', getFeesBonuses);
router.get('/:id', getFeeBonusById);
router.post('/', createFeeBonus);
router.put('/:id', updateFeeBonus);
router.delete('/:id', deleteFeeBonus);

module.exports = router;
