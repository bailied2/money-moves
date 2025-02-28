// accounts.js
const express = require('express');
const router = express.Router();



// GET /accounts - Get all accounts
const getAccounts = (req, res) => {
  //  db query logic to retrieve all accounts
  res.send({ data: "here's the accounts data" });
};

// GET /accounts/:id - Get a single account by ID
const getAccountById = (req, res) => {
  const accountId = req.params.id;
  //  db query logic to get account by ID
  res.send({ data: `here's the account data for ID: ${accountId}` });
};

// POST /accounts - Create a new account
const createAccount = (req, res) => {
  //  logic to create a new account (insert into database)
  res.send({ data: "account created successfully" });
};

// PUT /accounts/:id - Update an existing account by ID
const updateAccount = (req, res) => {
  const accountId = req.params.id;
  //  db update logic for the account
  res.send({ data: `account with ID ${accountId} updated` });
};

// DELETE /accounts/:id - Delete an account by ID
const deleteAccount = (req, res) => {
  const accountId = req.params.id;
  //  db delete logic for the account
  res.send({ data: `account with ID ${accountId} deleted` });
};

// Routes definition using the functions above
router.get('/accounts', getAccounts);                   // Get all accounts
router.get('/accounts/:id', getAccountById);            // Get account by ID
router.post('/accounts', createAccount);                // Create a new account
router.put('/accounts/:id', updateAccount);            // Update account by ID
router.delete('/accounts/:id', deleteAccount);         // Delete account by ID

module.exports = router;
