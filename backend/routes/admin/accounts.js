const express = require("express");
const router = express.Router();
const db = require("../../sample_database.js");
const bcrypt = require("bcrypt");

const authenticateToken = require("../../authMiddleware.js");

// GET /accounts - Get all accounts
const getAllAccounts = async (req, res) => {
  const query = "SELECT * FROM account";
  // return new Promise((resolve, reject) => {
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       reject("Error fetching accounts: " + err);
  //     } else {
  //       resolve(results); // This returns the data you are sending back as a response
  //     }
  //   });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return res.status(500).json({ error: "Failed to fetch accounts" });
  }
};

// GET /accounts/student/:id - Get all of the current user's student accounts in the classroom with the provided id
const getAccountsByStudent = async (req, res) => {
  const classroom_id = req.params.id;
  const user_id = req.user.id;
  // Logs for debugging
  console.log("\n*** getAccountsByStudent ***");

  console.log(classroom_id);
  console.log(user_id);

  const selectStudentQuery =
    "SELECT id FROM student WHERE fk_user_id = ? AND fk_classroom_id = ?";
  const selectAccountQuery =
    "SELECT account.*, SUM(transaction.amount) AS balance FROM account LEFT JOIN transaction ON transaction.fk_account_id = account.id WHERE account.fk_student_id = ? GROUP BY account.id";
  const selectInvestmentAccountQuery =
    "SELECT * FROM investment_account WHERE id = ?";

  try {
    const [studentResults] = await db.execute(selectStudentQuery, [
      user_id,
      classroom_id,
    ]);
    if (studentResults.length === 0) {
      console.error("Student not found");
      return res.status(404).json({ error: "Student not found" });
    }
    const student_id = studentResults[0].id;
    console.log(" student id:", student_id);

    const [accounts] = await db.execute(selectAccountQuery, [student_id]);
    
    for (const i in accounts) {
      if(accounts[i].account_type === 3)
      {
        const [investmentAccountResults] = await db.execute(
          selectInvestmentAccountQuery,
          [accounts[i].fk_investment_account_id]
        );
          accounts[i].title = investmentAccountResults[0].title;
      }
   }
    res.json({ accounts });
  } catch (error) {
    console.error("Error fetching accounts by student:", error);
    return res.status(500).send({ error: "Failed to fetch accounts" });
  }
};

// GET /accounts/:id - Get a single account by ID
const getAccountByIdFromDb = async (req, res) => {
  const query = "SELECT * FROM account WHERE id = ?";
  // db.query(query, [req.params.id], (err, results) => {
  //   if (err) {
  //     return res.status(500).send({ error: "Failed to fetch account" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).send({ error: "Account not found" });
  //   }
  //   res.send({ data: results[0] });
  // });
  try {
    const [results] = await db.execute(query, [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    console.error("Error fetching account:", error);
    return res.status(500).json({ error: "Failed to fetch account" });
  }
};

// router.get('/', async (req, res) => {
//   try {
//     const accounts = await getAllAccounts(); // Fetch all accounts using the function
//     res.json({ data: accounts });  // Send the fetched data as a JSON response
//   } catch (err) {
//     res.status(500).send({ error: 'Failed to fetch accounts' });
//   }
// });

// POST /accounts - Create a new user account with password hashing
const createAccountInDb = async (req, res) => {
  const { username, password, balance } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO account (username, password, balance) VALUES (?, ?, ?)";
    db.query(query, [username, hashedPassword, balance], (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Failed to create account" });
      }
      res.send({
        data: `Account created successfully with ID ${result.insertId}`,
      });
    });
  } catch (err) {
    res.status(500).send({ error: "Server error while hashing password" });
  }
};

// PUT /accounts/:id - Update an existing account by ID
const updateAccountInDb = async (req, res) => {
  const { username, balance } = req.body;
  const accountId = req.params.id;
  const query = "UPDATE account SET username = ?, balance = ? WHERE id = ?";
  db.query(query, [username, balance, accountId], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Failed to update account" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.send({ data: `Account with ID ${accountId} updated` });
  });
  try {
    const [results] = await db.execute(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /accounts/:id - Delete an account by ID
const deleteAccountFromDb = async (req, res) => {
  const accountId = req.params.id;
  const query = "DELETE FROM account WHERE id = ?";
  db.query(query, [accountId], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Failed to delete account" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.send({ data: `Account with ID ${accountId} deleted` });
  });
  try {
    const [results] = await db.execute(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Routes definition using the functions above
router.get("/", getAllAccounts); // Get all accounts
router.get("/student/:id", authenticateToken, getAccountsByStudent);
router.get("/:id", getAccountByIdFromDb); // Get account by ID
router.post("/", createAccountInDb); // Create a new account
router.put("/:id", updateAccountInDb); // Update account by ID
router.delete("/:id", deleteAccountFromDb); // Delete account by ID

module.exports = router;
