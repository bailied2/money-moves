const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

const authenticateToken = require("../../authMiddleware");

// GET /fees-bonuses/:id - Get all fees and bonuses in a classroom
const getFeesBonuses = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM fees_bonuses WHERE fk_classroom_id = ?";

  console.log("Fetching fees and bonuses for classroom ID:", id);

  try {
    const [results] = await db.execute(query, [id]); // Pass the classroom ID
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching fees and bonuses:", error);
    return res.status(500).json({ error: "Failed to fetch fees and bonuses" });
  }
};
const getFeesBonusesById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM fees_bonuses WHERE id = ?";
  console.log("Request Body:", req.body);
  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "fee/bonus not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({ error: "Failed to fetch fee/bonus" });
  }
};

// POST /fees-bonuses - Create a new fee/bonus
const createFeesBonuses = async (req, res) => {
  const { title, description, amount, icon_class } = req.body.formData;
  const { classroom_id } = req.body;
  console.log("Request Body:", req.body.formData);
  const query =
    "INSERT INTO fees_bonuses ( title, description, amount, icon_class, fk_classroom_id) VALUES (?, ?, ?, ?, ?)";

  try {
    const result = await db.execute(query, [
      title,
      description,
      amount,
      icon_class,
      classroom_id,
    ]);
    res.json({
      data: `Fee/bonus created successfully with ID  ${result.insertId}`,
    });
  } catch (error) {
    console.error("Error creating fee/bonus:", error);
    return res.status(500).json({ error: "Failed to create fee/bonus" });
  }
};

// PUT /fees-bonuses - Update all fees and bonuses
const updateFeeBonus = async (req, res) => {
  const { title, amount, description, icon_class } = req.body.formData;
  const id = req.params.id;
  const query =
    "UPDATE fees_bonuses SET title = ?, description = ?, amount = ?, icon_class = ? WHERE id = ?";
  console.log("Request Body:", req.body);

  try {
    const [results] = await db.execute(query, [
      title,
      description,
      amount,
      icon_class,
      id,
    ]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Fee/bonus not found" });
    }
    res.json({ data: `Fee/bonus with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating fee/bonus:", error);
    return res.status(500).json({ error: "Failed to update fee/bonus" });
  }
};

// DELETE /fees-bonuses - Delete fee/bonus from a specific classroom
const deleteFeeBonus = async (req, res) => {
  const query = "DELETE FROM fees_bonuses WHERE id = ?";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting fees and bonuses:", err);
      return res
        .status(500)
        .send({ error: "Failed to delete fees and bonuses" });
    }
    res.send({ data: " fees/bonuses deleted successfully" });
  });
};

// Routes definition using the functions above
router.get("/classroom/:id", getFeesBonuses); // Get all fees and bonuses
router.get("/:id", getFeesBonusesById); // Get a fee/bonus by ID
router.post("/", createFeesBonuses); // Create a new fee/bonus
router.put("/", updateFeeBonus); // Update all fees/bonuses
router.delete("/", deleteFeeBonus); // Delete  fees/bonuses from a class
// router.post("/:id", assignFee); //Assign a fee/bonus

module.exports = router;
