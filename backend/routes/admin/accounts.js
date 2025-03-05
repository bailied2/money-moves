const express = require('express');
const router = express.Router();
const db = require('../sample_database'); // Assuming you have a db.js for MySQL connection

// GET /accounts - Get all accounts
const getAccounts = (req, res) => {
  const query = 'SELECT * FROM accounts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accounts:', err);
      return res.status(500).send({ error: 'Failed to fetch accounts' });
    }
    res.send({ data: results });
  });
};

// GET /accounts/:id - Get a single account by ID
const getAccountById = (req, res) => {
  const accountId = req.params.id;
  const query = 'SELECT * FROM accounts WHERE id = ?';
  db.query(query, [accountId], (err, results) => {
    if (err) {
      console.error('Error fetching account:', err);
      return res.status(500).send({ error: 'Failed to fetch account' });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.send({ data: results[0] });
  });
};

// POST /accounts - Create a new account
const createAccount = (req, res) => {
  const { username, balance } = req.body;
  const query = 'INSERT INTO accounts (username, balance) VALUES (?, ?)';
  db.query(query, [username, balance], (err, result) => {
    if (err) {
      console.error('Error creating account:', err);
      return res.status(500).send({ error: 'Failed to create account' });
    }
    res.send({ data: `Account created successfully with ID ${result.insertId}` });
  });
};

// PUT /accounts/:id - Update an existing account by ID
const updateAccount = (req, res) => {
  const accountId = req.params.id;
  const { username, balance } = req.body;
  const query = 'UPDATE accounts SET username = ?, balance = ? WHERE id = ?';
  db.query(query, [username, balance, accountId], (err, result) => {
    if (err) {
      console.error('Error updating account:', err);
      return res.status(500).send({ error: 'Failed to update account' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.send({ data: `Account with ID ${accountId} updated` });
  });
};

// DELETE /accounts/:id - Delete an account by ID
const deleteAccount = (req, res) => {
  const accountId = req.params.id;
  const query = 'DELETE FROM accounts WHERE id = ?';
  db.query(query, [accountId], (err, result) => {
    if (err) {
      console.error('Error deleting account:', err);
      return res.status(500).send({ error: 'Failed to delete account' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.send({ data: `Account with ID ${accountId} deleted` });
  });
};

// Routes definition using the functions above
router.get('/accounts', getAccounts);                   // Get all accounts
router.get('/accounts/:id', getAccountById);            // Get account by ID
router.post('/accounts', createAccount);                // Create a new account
router.put('/accounts/:id', updateAccount);             // Update account by ID
router.delete('/accounts/:id', deleteAccount);          // Delete account by ID

module.exports = router;
