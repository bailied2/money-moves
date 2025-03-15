const express = require("express");
const router = express.Router();
const db = require("../../sample_database.js");
const bcrypt = require("bcrypt");

const authenticateToken = require("../../authMiddleware.js");

// GET /accounts - Get all accounts
const getAllAccounts = () => {
  const query = "SELECT * FROM account";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject("Error fetching accounts: " + err);
      } else {
        resolve(results); // This returns the data you are sending back as a response
      }
    });
  });
};

// GET /accounts/student/:id - Get all of the current user's student accounts in the classroom with the provided id
const getAccountsByStudent = (req, res) => {
  const classroom_id = req.params.id;
  const user_id = req.user.id;

  const query =
    "SELECT id FROM student WHERE fk_user_id = ? AND fk_classroom_id = ?";

  db.query(query, [user_id, classroom_id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch student id" });
    }
    console.log(result.toString());
    const student_id = result[0].id;

    const query = "SELECT * FROM account WHERE fk_student_id = ?";

    db.query(query, [student_id], (err, results) => {
      if (err) {
        return res.status(500).send({ error: "Failed to fetch accounts" });
      }
      res.json({ accounts: results });
    });
  });
};

// GET /accounts/:id - Get a single account by ID
const getAccountByIdFromDb = (req, res) => {
  const query = "SELECT * FROM account WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch account" });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.send({ data: results[0] });
  });
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
const updateAccountInDb = (req, res) => {
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
};

// DELETE /accounts/:id - Delete an account by ID
const deleteAccountFromDb = (req, res) => {
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
};

// Routes definition using the functions above
router.get("/", getAllAccounts); // Get all accounts
router.get("/student/:id", authenticateToken, getAccountsByStudent);
router.get("/:id", getAccountByIdFromDb); // Get account by ID
router.post("/", createAccountInDb); // Create a new account
router.put("/:id", updateAccountInDb); // Update account by ID
router.delete("/:id", deleteAccountFromDb); // Delete account by ID

module.exports = router;
