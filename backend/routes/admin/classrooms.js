const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
  res.send({data: "here's your data"})
});
router.get('/id', (req,res) => {
  res.send({data: "here's your data"})
});

router.post('/', (req,res) => {
  res.send({data: "classroom created"})
});

router.put('/', (req,res) => {
  res.send({data: "classroom updated"})
});
router.delete('/', (req,res) => {
  res.send({data: "classroom deleted"})
});

// Controller functions 
// const {
//   getClassrooms,
//   getClassroomById,
//   createClassroom,
//   updateClassroom,
//   deleteClassroom
// } = require('../controllers/classroomController');

// Routes
// router.get('/', getClassrooms);
// router.get('/:id', getClassroomById);
// router.post('/', createClassroom);
// router.put('/:id', updateClassroom);
// router.delete('/:id', deleteClassroom);

module.exports = router;
