// Import the mysql2 library
const mysql = require("mysql2/promise");

/**
 * Configured MySQL connection using environment variables
 * If the environment variables are not present, default values are used.
 **/
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "deltona.birdnest.org", // Replace with your host
//   user: process.env.DB_USER || "my.goffk3",           // Replace with your MySQL username
//   password: process.env.DB_PASSWORD || "42ha@p489",   // Replace with your MySQL password
//   database: process.env.DB_NAME || "my_goffk3_moneymovesdb" // Replace with your MySQL database name
// });

/**
 * Configured MySQL connection to use connection pooling so as to avoid errors
 * that are caused by the single database connection timing out.
 **/
const pool = mysql.createPool({
  // Connection configuration
  host: process.env.DB_HOST || "deltona.birdnest.org", 
  user: process.env.DB_USER || "my.goffk3", 
  password: process.env.DB_PASSWORD || "42ha@p489", 
  database: process.env.DB_NAME || "my_goffk3_moneymovesdb", 
  // Pool configuration
  waitForConnections: true, // Wait if all connections are busy
  connectionLimit: 10, // Number of connections in pool
  queueLimit: 0, // 0 means unlimited queue
  namedPlaceholders: true,
});

// Establish connection to MySQL database
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//   } else {
//     console.log("Connected to the database!");
//   }
// });

// Slightly different connection verification for pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database!");
    connection.release(); // Release the connection back to the pool
  }
});

// Export the pool object for use in other files
module.exports = pool;
