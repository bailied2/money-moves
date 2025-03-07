const express = require('express');
const router = express.Router();
const db = require('../../sample_database');

// GET / - Get all classrooms
const getClassrooms = (req, res) => {
  const query = 'SELECT * FROM classrooms';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching classrooms:', err);
      return res.status(500).send({ error: 'Failed to fetch classrooms' });
    }
    res.send({ data: results });
  });
};

// GET /:id - Get a single classroom by id
const getClassroomById = (req, res) => {
  const classroomId = req.params.id;
  const query = 'SELECT * FROM classrooms WHERE id = ?';
  db.query(query, [classroomId], (err, results) => {
    if (err) {
      console.error('Error fetching classroom:', err);
      return res.status(500).send({ error: 'Failed to fetch classroom' });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: 'Classroom not found' });
    }
    res.send({ data: results[0] });
  });
};

// POST / - Create a new classroom
const createClassroom = (req, res) => {
  const { name, teacher_id } = req.body; // Extracting name and teacher_id from the request body
  const query = 'INSERT INTO classrooms (name, teacher_id) VALUES (?, ?)';
  db.query(query, [name, teacher_id], (err, result) => {
    if (err) {
      console.error('Error creating classroom:', err);
      return res.status(500).send({ error: 'Failed to create classroom' });
    }
    res.send({ data: `Classroom created successfully with ID ${result.insertId}` });
  });
};

// PUT /:id - Update a classroom by id
const updateClassroom = (req, res) => {
  const classroomId = req.params.id;
  const { name, teacher_id } = req.body; // Extracting updated name and teacher_id from the request body
  const query = 'UPDATE classrooms SET name = ?, teacher_id = ? WHERE id = ?';
  db.query(query, [name, teacher_id, classroomId], (err, result) => {
    if (err) {
      console.error('Error updating classroom:', err);
      return res.status(500).send({ error: 'Failed to update classroom' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Classroom not found' });
    }
    res.send({ data: `Classroom with ID ${classroomId} updated` });
  });
};

// DELETE /:id - Delete a classroom by id
const deleteClassroom = (req, res) => {
  const classroomId = req.params.id;
  const query = 'DELETE FROM classrooms WHERE id = ?';
  db.query(query, [classroomId], (err, result) => {
    if (err) {
      console.error('Error deleting classroom:', err);
      return res.status(500).send({ error: 'Failed to delete classroom' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Classroom not found' });
    }
    res.send({ data: `Classroom with ID ${classroomId} deleted` });
  });
};

// Routes definition using the functions above
router.get('/', getClassrooms);                   // Get all classrooms
router.get('/:id', getClassroomById);             // Get a classroom by ID
router.post('/', createClassroom);                // Create a classroom
router.put('/:id', updateClassroom);              // Update a classroom by ID
router.delete('/:id', deleteClassroom);           // Delete a classroom by ID

module.exports = router;
