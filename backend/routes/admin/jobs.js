const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /jobs - Get all jobs in classrooms
const getJobs = async (req, res) => {
  const query = "SELECT * FROM jobs";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching jobs:", err);
  //     return res.status(500).send({ error: "Failed to fetch jobs" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// POST /jobs - Create a new job
const createJob = async (req, res) => {
  const { title, wage, description, classroom_id } = req.body; // Extracting data from request body
  const query =
    "INSERT INTO jobs (title, wage, description, classroom_id) VALUES (?, ?, ?, ?)";
  // db.query(query, [title, wage, description, classroom_id], (err, result) => {
  //   if (err) {
  //     console.error("Error creating job:", err);
  //     return res.status(500).send({ error: "Failed to create job" });
  //   }
  //   res.send({
  //     data: `New job created successfully with ID ${result.insertId}`,
  //   });
  // });
  try {
    const result = await db.execute(query, [
      title,
      wage,
      description,
      classroom_id,
    ]);
    res.json({
      data: `New job created successfully with ID ${result.insertId}`,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Failed to create job" });
  }
};

// PUT /jobs - Update job details
const updateJob = async (req, res) => {
  const { id, title, wage, description } = req.body; // Extracting updated data from request body
  const query =
    "UPDATE jobs SET title = ?, wage = ?, description = ? WHERE id = ?";
  // db.query(query, [title, wage, description, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating job:", err);
  //     return res.status(500).send({ error: "Failed to update job" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Job not found" });
  //   }
  //   res.send({ data: `Job with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [title, wage, description, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ data: `Job with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ error: "Failed to update job" });
  }
};

// DELETE /jobs - Delete all jobs
const deleteJob = async (req, res) => {
  const query = "DELETE FROM jobs";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting jobs:", err);
      return res.status(500).send({ error: "Failed to delete jobs" });
    }
    res.send({ data: "All jobs deleted successfully" });
  });
  // try {
  //   const [results] = await db.execute(query);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// Routes definition using the functions above
router.get("/jobs", getJobs); // Get all jobs
router.post("/jobs", createJob); // Create a new job
router.put("/jobs", updateJob); // Update job details
router.delete("/jobs", deleteJob); // Delete all jobs

module.exports = router;
