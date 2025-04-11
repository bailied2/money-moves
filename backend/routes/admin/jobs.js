const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /jobs - Get all jobs in a specific classroom
const getJobs = async (req, res) => {
  const query = "SELECT * FROM job WHERE fk_classroom_id = ?";
 
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJobById = async (req,res) => {
  const { id } = req.params;
  const query = "SELECT * FROM job WHERE id = ?";
  console.log("Request Body:", req.body);
  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "job not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({ error: "Failed to fetch job" });
  }

};

// POST /jobs - Create a new job
const createJob = async (req, res) => {
  const { job_title, wage, job_description, pay_frequency, pay_day, icon_class, is_trustee } = req.body.formData;
  const {classroom_id}= req.body;
  // Extracting data from request body
  console.log("Request Body:", req.body);
  const query =
    "INSERT INTO job (fk_classroom_id, title, wage, description, pay_frequency, pay_day, icon_class, is_trustee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  try {
    const result = await db.execute(query, [
      classroom_id, 
      job_title, 
      wage, 
      job_description, 
      pay_frequency, 
      pay_day, 
      icon_class, 
      is_trustee,
    ]);
    res.json({
      data: `New job created successfully `,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Failed to create job" });
  }
};

// PUT /jobs - Update job details
const updateJob = async (req, res) => {
  const { title, wage, description, pay_day, pay_frequency, icon_class, is_trustee } = req.body.formData; // Extracting updated data from request body
  const id = req.params.id;
  const query =
    "UPDATE job SET title = ?, wage = ?, description = ?, pay_day = ?, pay_frequency =?, icon_class = ?, is_trustee = ? WHERE id = ?";
  
  try {
    const [results] = await db.execute(query, [
      title, 
      wage, 
      description,
      pay_day,
      pay_frequency,
      icon_class,
      is_trustee,
      id
    ]);
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
 
};

// Routes definition using the functions above
router.get("/classroom/:id/jobs", getJobs); // Get all jobs
router.get("/:id", getJobById); // Get a job by ID
router.post("/", createJob); // Create a new job
router.put("/:id", updateJob); // Update job details
router.delete("/:id", deleteJob); //Delete a job



module.exports = router;

// for updates, fetch all the data for that specific job, 
// (get request to the backend to get a property by id), 
// then set the fields to the form data
//