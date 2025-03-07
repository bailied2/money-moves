const express = require('express');
const router = express.Router();
const db = require('../sample_database'); 
const bcrypt = require('bcrypt'); 

// GET /accounts - Get all accounts
const getAccounts = (req, res) => {
  const query = 'SELECT * FROM account';
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
  const query = 'SELECT * FROM account WHERE id = ?';
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

// POST /accounts - Create a new user account with password hashing
const createAccount = async (req, res) => {
  const { username, password, balance } = req.body;

  // user left something blank
  if (!username || !password || balance == null) {
    return res.status(400).send({ error: 'Username, password, and balance are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO account (username, password, balance) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, balance], (err, result) => {
      if (err) {
        console.error('Error creating account:', err);
        return res.status(500).send({ error: 'Failed to create account' });
      }
      res.send({ data: `Account created successfully with ID ${result.insertId}` });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send({ error: 'Server error' });
  }
};

// PUT /accounts/:id - Update an existing account by ID
const updateAccount = (req, res) => {
  const accountId = req.params.id;
  const { username, balance } = req.body;
  const query = 'UPDATE account SET username = ?, balance = ? WHERE id = ?';
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
  const query = 'DELETE FROM account WHERE id = ?';
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
