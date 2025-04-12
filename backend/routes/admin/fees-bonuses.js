const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /fees-bonuses - Get all fees and bonuses in a classroom
const getFeesBonuses = async (req, res) => {
  const query = "SELECT * FROM fees_bonuses WHERE fk_classroom_id = ?";
   console.log("Request Body:", req.body);

  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching fees and bonuses:", error);
    return res.status(500).json({ error: "Failed to fetch fees and bonuses" });
  }
};

// POST /fees-bonuses - Create a new fee/bonus
const createFeeBonus = async (req, res) => {
  const { fk_classroom_id, title, description, amount, icon_class } = req.body; 
  console.log("Request Body:", req.body);
  const query =
    "INSERT INTO fees_bonuses (fk_classroom_id, title, description, amount, icon_class) VALUES (?, ?, ?, ?, ?)";
 
  try {
    const result = await db.execute(query, [
      fk_classroom_id,
      title,
      amount,
      icon_class,
      description,
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
  const { fk_classroom_id, title, amount, description, icon_class } = req.body; 
  const query =
    "UPDATE fees_bonuses SET title = ?, amount = ?, description = ?, icon_class = ? WHERE fk_classroom_id = ?, id = ?";
    console.log("Request Body:", req.body);

    try {
    const [results] = await db.execute(query, [
      fk_classroom_id,
      title,
      description,
      amount,
      icon_class,
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

// DELETE /fees-bonuses - Delete all fees and bonuses
const deleteFeeBonus = async (req, res) => {
  const query = "DELETE FROM fees_bonuses WHERE fk_classroom_id = ?, id = ?";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting fees and bonuses:", err);
      return res
        .status(500)
        .send({ error: "Failed to delete fees and bonuses" });
    }
    res.send({ data: "All fees/bonuses deleted successfully" });
  });
  
};

// Routes definition using the functions above
router.get("/fees-bonuses/:id/fees-bonuses", getFeesBonuses); // Get all fees and bonuses
router.post("/fees-bonuses", createFeeBonus); // Create a new fee/bonus
router.put("/fees-bonuses", updateFeeBonus); // Update all fees/bonuses
router.delete("/fees-bonuses", deleteFeeBonus); // Delete all fees/bonuses

module.exports = router;
