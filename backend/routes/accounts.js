const express = require('express');
const router = express.Router();

// Controller functions 
const {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
} = require('../controllers/accountController');

// Routes
router.get('/', getAccounts);
router.get('/:id', getAccountById);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;
