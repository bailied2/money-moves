const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // bcrypt for hashing passwords.
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../sample_database.js");
const authenticateToken = require("../authMiddleware.js");
const { sendForgotPassword } = require("../utils/emailService"); // Import email service

const JWT_SECRET =
  process.env.JWT_SECRET || // Should be kept to just environment variable in production
  "b165f503224f0b78f682934b5ea8d20c6520b14474c616b3c4392ea6318f91ddf45f019605906819c8484c2f14624fe532db88afd331d1840ca25a52c7f1303c";

/**
 * POST /forgot-password
 * - Send reset password email
 */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const sql = "SELECT id FROM user WHERE email = ?";
  try {
    const [results] = await db.execute(sql, [email]);

    if (results.length === 0) {
      return res.status(404).json({ error: "No user found with that email." });
    }

    // Generate token
    const token = crypto.randomBytes(2).toString("hex");
    console.log(token);

    const updateSql = "UPDATE user SET password_reset_code = ? WHERE email = ?";
    await db.execute(updateSql, [token, email]);

    // Send reset email using email service
    await sendForgotPassword(email, token);

    res.json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

/**
 * POST /reset-password
 * - Handle password reset
 */
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  const sql = "SELECT id FROM user WHERE reset_token = ?";
  try {
    const [results] = await db.execute(sql, [token]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    const user = results[0];

    // Check if token has expired
    // if (Date.now() > user.reset_token_expiry) {
    //   return res.status(400).json({ error: "Reset token has expired." });
    // }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update password in database
    const updateSql =
      "UPDATE user SET hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?";
    await db.execute(updateSql, [hashedPassword, token]);

    res.json({ message: "Password successfully reset." });
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password." });
  }
});

/**
 * GET /users
 * - Get all user records
 */
const getUsers = async (req, res) => {
  const sql = "SELECT id, first_name, last_name, email FROM user"; // Query to retrieve all users

  try {
    const [users] = await db.execute(sql);
    res.json({ users }); // Return the list of users
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /users/:id
 * - Get a specific user record by ID
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  const sql = "SELECT id, first_name, last_name, email FROM user WHERE id = ?"; // Query to retrieve user by ID

  try {
    const [results] = await db.execute(sql, [id]);
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ data: results[0] }); // Return the specific user record
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /users/profile
 * - Get the current, authenticated user's profile information
 *
 * This function assumes the request has already been through the authenticateToken
 * middleware, meaning that it has been attached with the current user's info.
 */
const getUserProfile = async (req, res) => {
  const user_id = req.user.id; // Get user_id from info attached by middleware

  const sql = "SELECT id, first_name, last_name, email FROM user WHERE id = ?";

  try {
    const [results] = await db.execute(sql, [user_id]);
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ user: results[0] }); // Return user profile
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /users
 * - Create a new user record
 */
const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hash = await bcrypt.hash(password, saltRounds);

    const sql =
      "INSERT INTO user (first_name, last_name, email, hash) VALUES (?, ?, ?, ?)"; // Insert query

    try {
      // Insert new user into database
      const insertedUser = await db.execute(sql, [
        first_name,
        last_name,
        email,
        hash,
      ]);
      // Generate newly signed token for user
      const token = jwt.sign({ id: insertedUser.insertId, email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      // Send response back to frontend with new token cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // true in production
          sameSite: "Strict",
        })
        .json({
          message: "User registered successfully",
          id: insertedUser.insertId,
          user: {
            id: insertedUser.insertId,
            first_name,
            last_name,
            email,
          },
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Error hashing password" });
  }
};

const handleLogin = async (req, res) => {
  console.log("\n*** handleLogin ***");

  const { email, password } = req.body;
  console.log("  email:", email, "\n  password:", password);

  const sql =
    "SELECT id, first_name, last_name, hash FROM user WHERE email = ?;"; // Prepared statement for finding user by email

  try {
    const [results] = await db.execute(sql, [email]);
    // If no results found, return user not found error.
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });
    // Otherwise, if the user exists:
    const user = results[0];
    try {
      // Check the provided password
      bcrypt.compare(password, user.hash, (err, isMatch) => {
        // If error, return error message
        if (err) return res.status(401).json({ error: error.message });
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
            .json({
              message: "Login successful",
              user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email,
              },
            });
        }
      });
    } catch (error) {
      // If there was an error hashing the password with bcrypt, send back error.
      res.status(500).json({ error: "Error hashing password" });
    }
  } catch (error) {
    // If error, return error message
    res.status(500).json({ error: "Error fetching user" });
  }
};

/**
 * POST /users/logout
 * - Logout current user
 */
const handleLogout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

/**
 * PUT /users/:id
 * - Update a specific user record by ID
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;

  // Optional: If password is provided, hash it
  const sqlValues = password
    ? [first_name, last_name, email, bcrypt.hashSync(password, 10), id]
    : [first_name, last_name, email, id];

  const sql = password
    ? "UPDATE user SET first_name = ?, last_name = ?, email = ?, hash = ? WHERE id = ?"
    : "UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE id = ?";

  try {
    const [results] = await db.execute(sql, sqlValues);
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ message: `User with ID ${id} updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /users/:id
 * - Delete a specific user record by ID
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM user WHERE id = ?"; // Delete query

  try {
    const [results] = await db.execute(sql, [id]);
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Routes definition using the functions above
router.get("/", getUsers); // Get all user records
router.get("/profile", authenticateToken, getUserProfile); // Get a currently authenticated user's profile
router.get("/:id", getUserById); // Get a user record by ID
router.post("/register", createUser); // Create a new user record
router.post("/login", handleLogin); // Handle user login attempt
router.post("/logout", handleLogout); // Handle user logout
router.put("/:id", updateUser); // Update a user record by ID
router.delete("/:id", deleteUser); // Delete a user record by ID

module.exports = router;
