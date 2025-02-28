// transactions.js
const express = require('express');
const router = express.Router();


// GET /transactions - Get all transactions
const getTransactions = (req, res) => {
  //  logic to retrieve all transactions from the db
  res.send({ data: "here's all the transactions data" });
};

// GET /transactions/:id - Get a specific transaction by ID
const getTransactionById = (req, res) => {
  const { id } = req.params;
  //  logic to retrieve a transaction by its ID from the db
  res.send({ data: `here's the transaction data for ID: ${id}` });
};

// POST /transactions - Create a new transaction
const createTransaction = (req, res) => {
  //  logic to create a new transaction (insert into the db)
  res.send({ data: "new transaction created successfully" });
};

// PUT /transactions/:id - Update a specific transaction by ID
const updateTransaction = (req, res) => {
  const { id } = req.params;
  //  logic to update a specific transaction by its ID
  res.send({ data: `transaction with ID: ${id} updated successfully` });
};

// DELETE /transactions/:id - Delete a specific transaction by ID
const deleteTransaction = (req, res) => {
  const { id } = req.params;
  //  logic to delete a specific transaction by its ID
  res.send({ data: `transaction with ID: ${id} deleted successfully` });
};

// Routes definition using the functions above
router.get('/transactions', getTransactions);           // Get all transactions
router.get('/transactions/:id', getTransactionById);     // Get a transaction by ID
router.post('/transactions', createTransaction);         // Create a new transaction
router.put('/transactions/:id', updateTransaction);      // Update a transaction by ID
router.delete('/transactions/:id', deleteTransaction);   // Delete a transaction by ID

module.exports = router;
