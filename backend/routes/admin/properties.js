const express = require('express');
const router = express.Router();
const db = require('../../sample_database');

// GET /properties - Get all properties
const getProperties = (req, res) => {
  const query = 'SELECT * FROM properties';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching properties:', err);
      return res.status(500).send({ error: 'Failed to fetch properties' });
    }
    res.send({ data: results });
  });
};

// GET /properties/:id - Get a specific property by ID
const getPropertyById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM properties WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching property by ID:', err);
      return res.status(500).send({ error: 'Failed to fetch property' });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: 'Property not found' });
    }
    res.send({ data: results[0] });
  });
};

// POST /properties - Create a new property
const createProperty = (req, res) => {
  const { name, value, rent, maintenance_cost, owner_id } = req.body; // Extracting data from request body
  const query = 'INSERT INTO properties (name, value, rent, maintenance_cost, owner_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, value, rent, maintenance_cost, owner_id], (err, result) => {
    if (err) {
      console.error('Error creating property:', err);
      return res.status(500).send({ error: 'Failed to create property' });
    }
    res.send({ data: `New property created successfully with ID ${result.insertId}` });
  });
};

// PUT /properties/:id - Update a specific property by ID
const updateProperty = (req, res) => {
  const { id } = req.params;
  const { name, value, rent, maintenance_cost } = req.body; // Extracting updated data from request body
  const query = 'UPDATE properties SET name = ?, value = ?, rent = ?, maintenance_cost = ? WHERE id = ?';
  db.query(query, [name, value, rent, maintenance_cost, id], (err, result) => {
    if (err) {
      console.error('Error updating property:', err);
      return res.status(500).send({ error: 'Failed to update property' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Property not found' });
    }
    res.send({ data: `Property with ID ${id} updated successfully` });
  });
};

// DELETE /properties/:id - Delete a specific property by ID
const deleteProperty = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM properties WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting property:', err);
      return res.status(500).send({ error: 'Failed to delete property' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Property not found' });
    }
    res.send({ data: `Property with ID ${id} deleted successfully` });
  });
};

// Routes definition using the functions above
router.get('/properties', getProperties);           // Get all properties
router.get('/properties/:id', getPropertyById);     // Get a property by ID
router.post('/properties', createProperty);         // Create a new property
router.put('/properties/:id', updateProperty);      // Update a property by ID
router.delete('/properties/:id', deleteProperty);   // Delete a property by ID

module.exports = router;
