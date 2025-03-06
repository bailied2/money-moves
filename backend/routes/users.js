// users.js
const express = require("express");
const router = express.Router();

/** - Added bcrypt and database imports
 *
 * bcrypt is a widely-popular package for handling password encryption
 * that is simple and straightforward to use, so I chose to use it for
 * this project.
 *
 * We also need to import the database connection so that we can query the database from here.
 *
 **/
const bcrypt = require("bcrypt"); // bcrypt for hashing passwords.
const db = require("../sample_database");

// GET /users - Get all user records
const getUsers = (req, res) => {
  //  logic to retrieve all user records from the database
  res.send({ data: "here's all the user records" });
};

// GET /users/:id - Get a specific user record by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  //  logic to retrieve a specific user record by its ID from the database
  res.send({ data: `here's the user data for ID: ${id}` });
};

/** - Implemented createUser function
 *
 * This function accepts an HTTP request with the user's inputted
 * first name, last name, email, and password. It uses bcrypt to
 * encrypt the password, then queries the database to insert the
 * new user.
 *
 **/
// POST /users - Create a new user record
const createUser = async (req, res) => {
  console.log("createUser");
  const { first_name, last_name, email, password } = req.body;

  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hash = await bcrypt.hash(password, saltRounds);

    const sql = // Prepared statement for inserting new user
      "INSERT INTO user (first_name, last_name, email, hash) VALUES (?, ?, ?, ?)";

    // Query Database
    db.query(sql, [first_name, last_name, email, hash], (err, result) => {
      // If error, return error message
      if (err) return res.status(500).json({ error: err.message });
      // Otherwise send confirmation message.
      res.json({
        message: "User registered successfully",
        id: result.insertId,
      });
    });
  } catch (error) {
    // If there was an error hashing the password with bcrypt, send back error.
    res.status(500).json({ error: "Error hashing password" });
  }
  // res.send({ data: "new user record created successfully" });
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
  //  logic to update a specific user record by its ID
  res.send({ data: `user record with ID: ${id} updated successfully` });
};

// DELETE /users/:id - Delete a specific user record by ID
const deleteUser = (req, res) => {
  const { id } = req.params;
  //  logic to delete a specific user record by its ID
  res.send({ data: `user record with ID: ${id} deleted successfully` });
};

/** - Updated Router.method() routes
 *
 * I removed "/users" from the start of the routes below, because
 *
 *    ` app.use("/api/users", userRoute); ` in app.js
 *
 * maps the "/" in this file to "/api/users"
 * (and "/:id" to "/api/users/:id").
 *
 **/
// Routes definition using the functions above
router.get("/", getUsers); // Get all user records
router.get("/:id", getUserById); // Get a user record by ID
router.post("/", createUser); // Create a new user record
router.post("/login", handleLogin); // Handle user login attempt
router.put("/:id", updateUser); // Update a user record by ID
router.delete("/:id", deleteUser); // Delete a user record by ID

module.exports = router;
