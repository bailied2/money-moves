const mysql = require("mysql2");

/** - Configured mysql connection to use environment variables
 *
 * Here, I set up the mysql database connection to use environment
 * variables (as explained in app.js) for the configuration if they
 * are there, or your original values if not so that it would still
 * function the same as you left it without environment variables
 * configured.
 *
 **/

module.exports = mysql.createConnection({
  host: `${process.env.DB_HOST || "deltona.birdnest.org"}`,
  user: `${process.env.DB_USER || "my.goffk3"}`,
  password: `${process.env.DB_PASSWORD || "42ha@p489"}`,
  database: `${process.env.DB_NAME || "money-moves_sampledb"}`,
});
