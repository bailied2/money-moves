const express = require("express");

/** - Added cors (Cross-Origin Resource Sharing)
 * By default, the express server will not allow incoming HTTP requests from
 * a different origin. I have the React frontend running on localhost:3000,
 * and the backend running on localhost:5000, which are considered different
 * origins because the ports are different.
 *
 * By configuring the express server to use cors (under Middleware below), it
 * will allow requests from the frontend to the backend.
 **/
const cors = require("cors");

const app = express();

/** - Added environment variable port setting
 * The line below sets port to the current PORT environment variable, or 3000
 * by default if there is no such environment variable set in the system
 * environment. By running the server with the terminal command
 *
 *    ` node --env-file=.env app.js `
 *
 * I can tell node to load an .env file (in the same directory as app.js) for
 * custom environment variable settings. The .env file is kept private (and
 * included in .gitignore) so different settings can be used in different
 * development environments, and the values can be hidden for security (such
 * as MySQL database passwords)
 *
 * For example, my .env file looks like this (with password starred out):
 *
 *  `` Line 1: PORT=5000
 *  `` Line 2: DB_PASSWORD=*****
 *
 **/
const port = process.env.PORT || 5000;

// Import routes
const userRoute = require("./routes/users");
const classroomRoute = require("./routes/admin/classrooms");
const accountRoute = require("./routes/admin/accounts");
const feesBonusesRoute = require("./routes/admin/fees-bonuses");
const investmentAccountRoute = require("./routes/admin/investment-accounts");
const jobRoute = require("./routes/admin/jobs");
const propertyRoute = require("./routes/admin/properties");
const transactionRoute = require("./routes/admin/transactions");
const yearEndRoute = require("./routes/admin/year-ends");
const studentRoute = require("./routes/students");

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend requests

// Routes with their respective API prefixes
app.use("/api/users", userRoute); // User routes
app.use("/api/classrooms", classroomRoute); // Classroom routes
app.use("/api/accounts", accountRoute); // Account routes
app.use("/api/fees-bonuses", feesBonusesRoute); // Fees and Bonuses routes
app.use("/api/investment-accounts", investmentAccountRoute); // Investment Accounts routes
app.use("/api/jobs", jobRoute); // Jobs routes
app.use("/api/properties", propertyRoute); // Properties routes
app.use("/api/transactions", transactionRoute); // Transactions routes
app.use("/api/year-ends", yearEndRoute); // Year Ends routes
app.use("/api/students", studentRoute); // Student routes

// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
