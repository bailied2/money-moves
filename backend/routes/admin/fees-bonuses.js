const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /fees-bonuses - Get all fees and bonuses
const getFeesBonuses = async (req, res) => {
  const query = "SELECT * FROM fees_bonuses";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching fees and bonuses:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to fetch fees and bonuses" });
  //   }
  //   res.send({ data: results });
  // });
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
  const { type, amount, description, date, classroom_id } = req.body; // Extracting data from request body
  const query =
    "INSERT INTO fees_bonuses (type, amount, description, date, classroom_id) VALUES (?, ?, ?, ?, ?)";
  // db.query(
  //   query,
  //   [type, amount, description, date, classroom_id],
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error creating fee/bonus:", err);
  //       return res.status(500).send({ error: "Failed to create fee/bonus" });
  //     }
  //     res.send({
  //       data: `Fee/bonus created successfully with ID ${result.insertId}`,
  //     });
  //   }
  // );
  try {
    const [results] = await db.execute(query, [
      type,
      amount,
      description,
      date,
      classroom_id,
    ]);
    res.json({
      data: `Fee/bonus created successfully with ID ${results.insertId}`,
    });
  } catch (error) {
    console.error("Error creating fee/bonus:", error);
    return res.status(500).json({ error: "Failed to create fee/bonus" });
  }
};

// PUT /fees-bonuses - Update all fees and bonuses
const updateFeeBonus = async (req, res) => {
  const { id, type, amount, description, date } = req.body; // Extracting updated data from request body
  const query =
    "UPDATE fees_bonuses SET type = ?, amount = ?, description = ?, date = ? WHERE id = ?";
  // db.query(query, [type, amount, description, date, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating fee/bonus:", err);
  //     return res.status(500).send({ error: "Failed to update fee/bonus" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Fee/bonus not found" });
  //   }
  //   res.send({ data: `Fee/bonus with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [
      type,
      amount,
      description,
      date,
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

// DELETE /fees-bonuses - Delete all fees and bonuses
const deleteFeeBonus = async (req, res) => {
  const query = "DELETE FROM fees_bonuses";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting fees and bonuses:", err);
      return res
        .status(500)
        .send({ error: "Failed to delete fees and bonuses" });
    }
    res.send({ data: "All fees/bonuses deleted successfully" });
  });
  // try {
  //   const [results] = await db.execute(query);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// Routes definition using the functions above
router.get("/fees-bonuses", getFeesBonuses); // Get all fees and bonuses
router.post("/fees-bonuses", createFeeBonus); // Create a new fee/bonus
router.put("/fees-bonuses", updateFeeBonus); // Update all fees/bonuses
router.delete("/fees-bonuses", deleteFeeBonus); // Delete all fees/bonuses

module.exports = router;
