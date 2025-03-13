const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // bcrypt for hashing passwords.
const jwt = require("jsonwebtoken");
const db = require("../sample_database.js");

const authenticateToken = require("../authMiddleware.js");

const JWT_SECRET =
  process.env.JWT_SECRET || // Should be kept to just environment variable in production
  "b165f503224f0b78f682934b5ea8d20c6520b14474c616b3c4392ea6318f91ddf45f019605906819c8484c2f14624fe532db88afd331d1840ca25a52c7f1303c";

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
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ data: results[0] }); // Return the specific user record
  });
};

// GET /users/profile - Get the current, authenticated user's profile information

/* 
 * This function assumes the request has already been through the authenticateToken
 * middleware, meaning that it has been attached with the current user's info.
 */
const getUserProfile = (req, res) => {
  // Logs for debugging
  console.log("getUserProfile"); 
  console.log(req.user);

  // Get user_id from info attached by middleware
  const user_id = req.user.id;
  const sql = "SELECT id, first_name, last_name, email FROM user WHERE id = ?";

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });
    console.log(results[0]); // Debug log
    res.json({ user: results[0] }); // Return user profile
  });
};

// POST /users - Create a new user record
const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hash = await bcrypt.hash(password, saltRounds);

    const sql =
      "INSERT INTO user (first_name, last_name, email, hash) VALUES (?, ?, ?, ?)"; // Insert query
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

const handleLogin = (req, res) => {
  console.log("handleLogin");

  const { email, password } = req.body;
  console.log("email:", email, "\npassword:", password);

  const sql = "SELECT id, hash FROM user WHERE email = ?;"; // Prepared statement for finding user by email

  // Query Database
  db.query(sql, [email], (err, result) => {
    // If error, return error message
    if (err) return res.status(500).json({ error: err.message });
    // If no results found, return user not found error.
    if (result.length === 0)
      return res.status(400).json({ error: "User not found" });
    // Otherwise, if the user exists:
    const user = result[0];
    try {
      // Check the provided password
      bcrypt.compare(password, user.hash, (err, isMatch) => {
        // If error, return error message
        if (err) return res.status(401).json({ error: err.message });
        // If no errors, check isMatch
        if (!isMatch) {
          // If isMatch is false, the password does not match. Send error message
          res.status(401).json({ error: "Username or password incorrect." });
        } else {
          // If password is correct, generate token
          const token = jwt.sign({ id: user.id, email: email }, JWT_SECRET, {
            expiresIn: "1h",
          });
          res
            .cookie("token", token, {
              httpOnly: true, // Prevents JS from accessing the cookie (more secure)
              secure: false, // Use 'true' in production (requires HTTPS)
              sameSite: "Strict", // Prevents CSRF attacks
            })
            .json({ message: "Login successful" });
        }
      });
    } catch (error) {
      // If there was an error hashing the password with bcrypt, send back error.
      res.status(500).json({ error: "Error hashing password" });
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
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ message: `User with ID ${id} updated successfully` });
  });
};

// DELETE /users/:id - Delete a specific user record by ID
const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM user WHERE id = ?"; // Delete query
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ message: `User with ID ${id} deleted successfully` });
  });
};

// Routes definition using the functions above
router.get("/", getUsers); // Get all user records
router.get("/profile", authenticateToken, getUserProfile); // Get a currently authenticated user's profile
router.get("/:id", getUserById); // Get a user record by ID
router.post("/", createUser); // Create a new user record
router.post("/login", handleLogin); // Handle user login attempt
router.put("/:id", updateUser); // Update a user record by ID
router.delete("/:id", deleteUser); // Delete a user record by ID

module.exports = router;
