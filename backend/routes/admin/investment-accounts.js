const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /investment-accounts - Get all investment accounts
const getInvestmentAccounts = async (req, res) => {
  const query = "SELECT * FROM investment_accounts";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching investment accounts:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to fetch investment accounts" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching investment accounts:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch investment accounts" });
  }
};

// POST /investment-accounts - Create a new investment account
const createInvestmentAccount = async (req, res) => {
  const { account_type, balance, interest_rate, user_id } = req.body; // Extracting data from request body
  const query =
    "INSERT INTO investment_accounts (account_type, balance, interest_rate, user_id) VALUES (?, ?, ?, ?)";
  // db.query(
  //   query,
  //   [account_type, balance, interest_rate, user_id],
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error creating investment account:", err);
  //       return res
  //         .status(500)
  //         .send({ error: "Failed to create investment account" });
  //     }
  //     res.send({
  //       data: `Investment account created successfully with ID ${result.insertId}`,
  //     });
  //   }
  // );
  try {
    const result = await db.execute(query, [
      account_type,
      balance,
      interest_rate,
      user_id,
    ]);
    res.json({
      data: `Investment account created successfully with ID ${result.insertId}`,
    });
  } catch (error) {
    console.error("Error creating investment account:", error);
    return res
      .status(500)
      .json({ error: "Failed to create investment account" });
  }
};

// PUT /investment-accounts - Update investment account details
const updateInvestmentAccount = async (req, res) => {
  const { id, account_type, balance, interest_rate } = req.body; // Extracting updated data from request body
  const query =
    "UPDATE investment_accounts SET account_type = ?, balance = ?, interest_rate = ? WHERE id = ?";
  // db.query(query, [account_type, balance, interest_rate, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating investment account:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to update investment account" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Investment account not found" });
  //   }
  //   res.send({ data: `Investment account with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [
      account_type,
      balance,
      interest_rate,
      id,
    ]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Investment account not found" });
    }
    res.json({ data: `Investment account with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating investment account:", error);
    return res
      .status(500)
      .json({ error: "Failed to update investment account" });
  }
};

// DELETE /investment-accounts - Delete all investment accounts
const deleteInvestmentAccount = async (req, res) => {
  const query = "DELETE FROM investment_accounts";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting investment accounts:", err);
      return res
        .status(500)
        .send({ error: "Failed to delete investment accounts" });
    }
    res.send({ data: "All investment accounts deleted successfully" });
  });
  // try {
  //   const [results] = await db.execute(query);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// Routes definition using the functions above
router.get("/investment-accounts", getInvestmentAccounts); // Get all investment accounts
router.post("/investment-accounts", createInvestmentAccount); // Create a new investment account
router.put("/investment-accounts", updateInvestmentAccount); // Update investment account details
router.delete("/investment-accounts", deleteInvestmentAccount); // Delete all investment accounts

module.exports = router;
