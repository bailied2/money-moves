const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // bcrypt for hashing passwords.
const db = require('../sample_database.js');

// GET /users - Get all user records
const getUsers = (req, res) => {
  const sql = "SELECT id, first_name, last_name, email FROM user"; // Query to retrieve all users
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results }); // Return the list of users
  });
};

// GET /users/:id - Get a specific user record by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, first_name, last_name, email FROM user WHERE id = ?"; // Query to retrieve user by ID
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    res.json({ data: results[0] }); // Return the specific user record
  });
};

// POST /users - Create a new user record
const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hash = await bcrypt.hash(password, saltRounds);

    const sql = "INSERT INTO user (first_name, last_name, email, hash) VALUES (?, ?, ?, ?)"; // Insert query
    db.query(sql, [first_name, last_name, email, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        message: "User registered successfully",
        id: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error hashing password" });
  }
};

const handleLogin = async (req, res) => {
  console.log("handleLogin");
  const { email, password } = req.body;
  console.log("email:", email, "\npassword:", password);
  const sql = "SELECT id, hash FROM user WHERE email = ?;"; // Prepared statement for finding user by email

  // Query Database
  db.query(sql, email, (err, result) => {
    // If error, return error message
    if (err) return res.status(500).json({ error: err.message });
    // Otherwise, if the user exists
    console.log(result);
    if (result[0].hash) {
      const user_id = result.id;
      const hash = result.hash;
      try {
        // Check the provided password
        bcrypt.compare(password, hash, (err, result) => {
          // If error, return error message
          if (err) return res.status(500).json({ error: err.message });
          // Otherwise, check result
          if (result != true) {
            // If result is not true, password does not match. Send error message
            res.status(500).json({ error: "Username or password incorrect." });
          }
          // Otherwise send confirmation message.
          res.json({
            message: "User logged in successfully",
            id: user_id,
          });
        });
      } catch (error) {
        // If there was an error hashing the password with bcrypt, send back error.
        res.status(500).json({ error: "Error hashing password" });
      }
    } else {
      // Otherwise, user was not found. Send error message.
      res.json({
        error: "User not found",
      });
    }
  });
};

// PUT /users/:id - Update a specific user record by ID
const updateUser = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;

  // Optional: If password is provided, hash it
  const sqlValues = password
    ? [first_name, last_name, email, bcrypt.hashSync(password, 10), id]
    : [first_name, last_name, email, id];

  const sql = password
    ? "UPDATE user SET first_name = ?, last_name = ?, email = ?, hash = ? WHERE id = ?"
    : "UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE id = ?";

  db.query(sql, sqlValues, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: `User with ID ${id} updated successfully` });
  });
};

// DELETE /users/:id - Delete a specific user record by ID
const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM user WHERE id = ?"; // Delete query
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: `User with ID ${id} deleted successfully` });
  });
};

// Routes definition using the functions above
router.get("/", getUsers); // Get all user records
router.get("/:id", getUserById); // Get a user record by ID
router.post("/", createUser); // Create a new user record
router.post("/login", handleLogin); // Handle user login attempt
router.put("/:id", updateUser); // Update a user record by ID
router.delete("/:id", deleteUser); // Delete a user record by ID

module.exports = router;
