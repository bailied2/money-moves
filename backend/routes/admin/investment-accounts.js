const express = require('express');
const router = express.Router();

// Controller functions 
const {
  getInvestmentAccounts,
  getInvestmentAccountById,
  createInvestmentAccount,
  updateInvestmentAccount,
  deleteInvestmentAccount
} = require('../controllers/investmentAccountController');

// Routes
router.get('/', getInvestmentAccounts);
router.get('/:id', getInvestmentAccountById);
router.post('/', createInvestmentAccount);
router.put('/:id', updateInvestmentAccount);
router.delete('/:id', deleteInvestmentAccount);

module.exports = router;
