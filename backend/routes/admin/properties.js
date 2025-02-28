// properties.js
const express = require('express');
const router = express.Router();



// GET /properties - Get all properties
const getProperties = (req, res) => {
  //  logic to retrieve all properties from the database
  res.send({ data: "here's all the properties data" });
};

// GET /properties/:id - Get a specific property by ID
const getPropertyById = (req, res) => {
  const { id } = req.params;
  //  logic to retrieve a property by its ID from the database
  res.send({ data: `here's the property data for ID: ${id}` });
};

// POST /properties - Create a new property
const createProperty = (req, res) => {
  //  logic to create a new property (insert into the database)
  res.send({ data: "new property created successfully" });
};

// PUT /properties/:id - Update a specific property by ID
const updateProperty = (req, res) => {
  const { id } = req.params;
  //  logic to update a specific property by its ID
  res.send({ data: `property with ID: ${id} updated successfully` });
};

// DELETE /properties/:id - Delete a specific property by ID
const deleteProperty = (req, res) => {
  const { id } = req.params;
  //  logic to delete a specific property by its ID
  res.send({ data: `property with ID: ${id} deleted successfully` });
};

// Routes definition using the functions above
router.get('/properties', getProperties);           // Get all properties
router.get('/properties/:id', getPropertyById);     // Get a property by ID
router.post('/properties', createProperty);         // Create a new property
router.put('/properties/:id', updateProperty);      // Update a property by ID
router.delete('/properties/:id', deleteProperty);   // Delete a property by ID

module.exports = router;
