const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /transactions - Get all transactions
const getTransactions = async (req, res) => {
  const query = "SELECT * FROM transactions";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching transactions:", err);
  //     return res.status(500).send({ error: "Failed to fetch transactions" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// GET /transactions/:id - Get a specific transaction by ID
const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM transactions WHERE id = ?";
  // db.query(query, [id], (err, results) => {
  //   if (err) {
  //     console.error("Error fetching transaction by ID:", err);
  //     return res.status(500).send({ error: "Failed to fetch transaction" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).send({ error: "Transaction not found" });
  //   }
  //   res.send({ data: results[0] });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    return res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

// POST /transactions - Create a new transaction
const createTransaction = async (req, res) => {
  const { amount, type, account_id, description, date } = req.body;
  const query =
    "INSERT INTO transactions (amount, type, account_id, description, date) VALUES (?, ?, ?, ?, ?)";
  // db.query(
  //   query,
  //   [amount, type, account_id, description, date],
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error creating transaction:", err);
  //       return res.status(500).send({ error: "Failed to create transaction" });
  //     }
  //     res.send({
  //       data: `Transaction created successfully with ID ${result.insertId}`,
  //     });
  //   }
  // );
  try {
    const [results] = await db.execute(query, [
      amount,
      type,
      account_id,
      description,
      date,
    ]);
    res.json({
      data: `Transaction created successfully with ID ${results.insertId}`,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ error: "Failed to create transaction" });
  }
};

// PUT /transactions/:id - Update a specific transaction by ID
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, type, description, date } = req.body;
  const query =
    "UPDATE transactions SET amount = ?, type = ?, description = ?, date = ? WHERE id = ?";
  // db.query(query, [amount, type, description, date, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating transaction:", err);
  //     return res.status(500).send({ error: "Failed to update transaction" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Transaction not found" });
  //   }
  //   res.send({ data: `Transaction with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [
      amount,
      type,
      description,
      date,
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ data: `Transaction with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return res.status(500).json({ error: "Failed to update transaction" });
  }
};

// DELETE /transactions/:id - Delete a specific transaction by ID
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM transactions WHERE id = ?";
  // db.query(query, [id], (err, result) => {
  //   if (err) {
  //     console.error("Error deleting transaction:", err);
  //     return res.status(500).send({ error: "Failed to delete transaction" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Transaction not found" });
  //   }
  //   res.send({ data: `Transaction with ID ${id} deleted successfully` });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ data: `Transaction with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ error: "Failed to delete transaction" });
  }
};

// Routes definition using the functions above
router.get("/transactions", getTransactions); // Get all transactions
router.get("/transactions/:id", getTransactionById); // Get a transaction by ID
router.post("/transactions", createTransaction); // Create a new transaction
router.put("/transactions/:id", updateTransaction); // Update a transaction by ID
router.delete("/transactions/:id", deleteTransaction); // Delete a transaction by ID

module.exports = router;
