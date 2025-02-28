const express = require('express');
const router = express.Router();
const PORT = 5000;

router.get('/', (req,res) => {
  res.send({data: "here's your data"})
});

router.post('/', (req,res) => {
  res.send({data: "account created"})
});

router.put('/', (req,res) => {
  res.send({data: "account updated"})
});
router.delete('/', (req,res) => {
  res.send({data: "account deleted"})
});


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
