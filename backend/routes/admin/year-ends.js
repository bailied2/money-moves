const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

// GET /year-ends - Get all year-end records
const getYearEnds = async (req, res) => {
  const query = "SELECT * FROM year_ends";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching year-end records:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to fetch year-end records" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching year-end records:", error);
    res.status(500).json({ error: "Failed to fetch year-end records" });
  }
};

// GET /year-ends/classroom/:id - Get all investment accounts for a particular classroom
const getYearEndsByClass = async (req, res) => {
  const classroom_id = req.params.id; // Get classroom_id from params

  // Debug logs
  console.log("\n*** getYearEndsByClass ***");

  console.log("  classroom_id: ", classroom_id);

  // Prepared statement
  const selectYearEndsQuery =
    "SELECT * FROM year_end WHERE fk_classroom_id = ?";

  const selectInvestmentValuesQuery = `SELECT investment_values.fk_year_end_id AS fk_year_end_id, investment_account.title as title, investment_values.share_value AS value 
    FROM investment_values
    RIGHT JOIN investment_account
    ON investment_values.fk_account_id = investment_account.id
    WHERE investment_account.fk_classroom_id = ?`;

  try {
    // Get all year ends for classroom
    const [year_ends] = await db.execute(selectYearEndsQuery, [classroom_id]);
    // Get yearly values for classroom
    const [investment_values] = await db.execute(selectInvestmentValuesQuery, [
      classroom_id,
    ]);

    // For each year end
    for (const year_end of year_ends) {
      // Add account values for the year to the object
      year_end.investment_values = investment_values.filter(
        (row) => row.fk_year_end_id == year_end.id
      );
    }
    // Send response with year_ends
    res.json({ year_ends });
  } catch (error) {
    console.error("Error fetching year ends:", error);
    return res.status(500).json({ error: "Failed to fetch year ends" });
  }
};

// GET /year-ends/:id - Get a specific year-end record by ID
const getYearEndById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM year_ends WHERE id = ?";
  // db.query(query, [id], (err, results) => {
  //   if (err) {
  //     console.error("Error fetching year-end record by ID:", err);
  //     return res.status(500).send({ error: "Failed to fetch year-end record" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).send({ error: "Year-end record not found" });
  //   }
  //   res.send({ data: results[0] });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Year-end record not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    console.error("Error fetching year-end record by ID:", error);
    return res.status(500).json({ error: "Failed to fetch year-end record" });
  }
};

/*
CREATE TABLE year_end (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  end_date TIMESTAMP NOT NULL,
  savings_apr DECIMAL(5,2) NOT NULL,
  UNIQUE (fk_classroom_id, end_date),
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE
);
*/

// POST /year-ends - Create a new year-end record
const createYearEnd = async (req, res) => {
  const { classroom_id, end_date } = req.body;
  const query =
    "INSERT INTO year_ends (year, total_income, total_expenses, net_profit, classroom_id) VALUES (?, ?, ?, ?, ?)";
  try {
    const result = await db.execute(query, [
      year,
      total_income,
      total_expenses,
      net_profit,
      classroom_id,
    ]);
    res.json({
      data: `Year-end record created successfully with ID ${result.insertId}`,
    });
  } catch (error) {
    console.error("Error creating year-end record:", error);
    res.status(500).json({ error: "Failed to create year-end record" });
  }
};

// PUT /year-ends/:id - Update a specific year-end record by ID
const updateYearEnd = async (req, res) => {
  const { id } = req.params;
  const { year, total_income, total_expenses, net_profit } = req.body;
  const query =
    "UPDATE year_ends SET year = ?, total_income = ?, total_expenses = ?, net_profit = ? WHERE id = ?";
  // db.query(
  //   query,
  //   [year, total_income, total_expenses, net_profit, id],
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error updating year-end record:", err);
  //       return res
  //         .status(500)
  //         .send({ error: "Failed to update year-end record" });
  //     }
  //     if (result.affectedRows === 0) {
  //       return res.status(404).send({ error: "Year-end record not found" });
  //     }
  //     res.send({ data: `Year-end record with ID ${id} updated successfully` });
  //   }
  // );
  try {
    const [results] = await db.execute(
      query[(year, total_income, total_expenses, net_profit, id)]
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Year-end record not found" });
    }
    res.json({ data: `Year-end record with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating year-end record:", error);
    res.status(500).json({ error: "Failed to update year-end record" });
  }
};

// DELETE /year-ends/:id - Delete a specific year-end record by ID
const deleteYearEnd = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM year_ends WHERE id = ?";
  // db.query(query, [id], (err, result) => {
  //   if (err) {
  //     console.error("Error deleting year-end record:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to delete year-end record" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Year-end record not found" });
  //   }
  //   res.send({ data: `Year-end record with ID ${id} deleted successfully` });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Year-end record not found" });
    }
    res.json({ data: `Year-end record with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting year-end record:", error);
    res.status(500).json({ error: "Failed to delete year-end record" });
  }
};

// Routes definition using the functions above
router.get("/", getYearEnds); // Get all year-end records
router.get("/classroom/:id", getYearEndsByClass); // Get all year ends for a particular class
router.get("/:id", getYearEndById); // Get a year-end record by ID
router.post("/", createYearEnd); // Create a new year-end record
router.put("/:id", updateYearEnd); // Update a year-end record by ID
router.delete("/:id", deleteYearEnd); // Delete a year-end record by ID

module.exports = router;
