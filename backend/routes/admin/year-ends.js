// year-ends.js
const express = require('express');
const router = express.Router();


// GET /year-ends - Get all year-end records
const getYearEnds = (req, res) => {
  //  logic to retrieve all year-end records from the db
  res.send({ data: "here's all the year-end records" });
};

// GET /year-ends/:id - Get a specific year-end record by ID
const getYearEndById = (req, res) => {
  const { id } = req.params;
  //  logic to retrieve a specific year-end record by its ID from the db
  res.send({ data: `here's the year-end record for ID: ${id}` });
};

// POST /year-ends - Create a new year-end record
const createYearEnd = (req, res) => {
  //  logic to create a new year-end record (insert into the db)
  res.send({ data: "new year-end record created successfully" });
};

// PUT /year-ends/:id - Update a specific year-end record by ID
const updateYearEnd = (req, res) => {
  const { id } = req.params;
  //  logic to update a specific year-end record by its ID
  res.send({ data: `year-end record with ID: ${id} updated successfully` });
};

// DELETE /year-ends/:id - Delete a specific year-end record by ID
const deleteYearEnd = (req, res) => {
  const { id } = req.params;
  //  logic to delete a specific year-end record by its ID
  res.send({ data: `year-end record with ID: ${id} deleted successfully` });
};

// Routes definition using the functions above
router.get('/year-ends', getYearEnds);              // Get all year-end records
router.get('/year-ends/:id', getYearEndById);       // Get a year-end record by ID
router.post('/year-ends', createYearEnd);           // Create a new year-end record
router.put('/year-ends/:id', updateYearEnd);        // Update a year-end record by ID
router.delete('/year-ends/:id', deleteYearEnd);     // Delete a year-end record by ID

module.exports = router;
