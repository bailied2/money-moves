const express = require('express');
const router = express.Router();
const db = require('../sample_database'); // Assuming db.js sets up the MySQL connection pool

// GET /students - Get all student records
const getStudents = (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching student records:', err);
      return res.status(500).send({ error: 'Failed to fetch student records' });
    }
    res.send({ data: results });
  });
};

// GET /students/:id - Get a specific student record by ID
const getStudentById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM students WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching student record by ID:', err);
      return res.status(500).send({ error: 'Failed to fetch student record' });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: 'Student record not found' });
    }
    res.send({ data: results[0] });
  });
};

// POST /students - Create a new student record
const createStudent = (req, res) => {
  const { name, email, classroom_id, balance } = req.body;
  const query = 'INSERT INTO students (name, email, classroom_id, balance) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, classroom_id, balance], (err, result) => {
    if (err) {
      console.error('Error creating student record:', err);
      return res.status(500).send({ error: 'Failed to create student record' });
    }
    res.send({ data: `Student record created successfully with ID ${result.insertId}` });
  });
};

// PUT /students/:id - Update a specific student record by ID
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, email, classroom_id, balance } = req.body;
  const query = 'UPDATE students SET name = ?, email = ?, classroom_id = ?, balance = ? WHERE id = ?';
  db.query(query, [name, email, classroom_id, balance, id], (err, result) => {
    if (err) {
      console.error('Error updating student record:', err);
      return res.status(500).send({ error: 'Failed to update student record' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Student record not found' });
    }
    res.send({ data: `Student record with ID ${id} updated successfully` });
  });
};

// DELETE /students/:id - Delete a specific student record by ID
const deleteStudent = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM students WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting student record:', err);
      return res.status(500).send({ error: 'Failed to delete student record' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Student record not found' });
    }
    res.send({ data: `Student record with ID ${id} deleted successfully` });
  });
};

// Routes definition using the functions above
router.get('/students', getStudents);              // Get all student records
router.get('/students/:id', getStudentById);       // Get a student record by ID
router.post('/students', createStudent);           // Create a new student record
router.put('/students/:id', updateStudent);        // Update a student record by ID
router.delete('/students/:id', deleteStudent);     // Delete a student record by ID

module.exports = router;
