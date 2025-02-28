const express = require("express");
const app = express();
const port = 8080; // Choose a port for your server

// Middleware
app.use(express.json()); // Parses JSON requests

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:8080`);
});

