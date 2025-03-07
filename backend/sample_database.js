// Import the mysql2 library
const mysql = require('mysql2');

/** 
 * Configured MySQL connection using environment variables
 * If the environment variables are not present, default values are used.
 **/
const db = mysql.createConnection({
  host: process.env.DB_HOST || "deltona.birdnest.org", // Replace with your host
  user: process.env.DB_USER || "my.goffk3",           // Replace with your MySQL username
  password: process.env.DB_PASSWORD || "42ha@p489",   // Replace with your MySQL password
  database: process.env.DB_NAME || "my_goffk3_moneymovesdb" // Replace with your MySQL database name
});

// Establish connection to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
  }
});

// Export the db connection object for use in other files
module.exports = db;
