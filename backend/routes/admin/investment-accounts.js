const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

const authenticateToken = require("../../authMiddleware");

// GET /investment-accounts - Get all investment accounts
const getInvestmentAccounts = async (req, res) => {
  const query = "SELECT * FROM investment_account";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching investment accounts:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to fetch investment accounts" });
  //   }
  //   res.send({ data: results });
  // });
  try {
    const [results] = await db.execute(query);
    res.json({ results });
  } catch (error) {
    console.error("Error fetching investment accounts:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch investment accounts" });
  }
};

// GET /investment-accounts/classroom/:id - Get all investment accounts for a particular classroom
const getInvestmentAccountsByClass = async (req, res) => {
  const classroom_id = req.params.id; // Get classroom_id from params

  // Debug logs
  console.log("\n*** getInvestmentAccountsByClass ***");

  console.log("  classroom_id: ", classroom_id);

  // Prepared statement
  const selectInvestmentAccountsQuery =
    "SELECT * FROM investment_account WHERE fk_classroom_id = ?";

  const selectYearlyValuesQuery = `SELECT investment_values.fk_account_id AS fk_investment_account_id, year_end.end_date as end_date, investment_values.share_value AS value 
    FROM investment_values
    RIGHT JOIN year_end
    ON investment_values.fk_year_end_id = year_end.id
    WHERE year_end.fk_classroom_id = ?`;

  try {
    // Get all investment accounts for classroom
    const [investment_accounts] = await db.execute(
      selectInvestmentAccountsQuery,
      [classroom_id]
    );
    // Get yearly values for classroom
    const [yearly_values] = await db.execute(selectYearlyValuesQuery, [
      classroom_id,
    ]);

    // For each investment account
    for (const investment_account of investment_accounts) {
      // Add yearly values for the account to the object
      investment_account.yearly_values = yearly_values.filter(
        (row) => row.fk_investment_account_id == investment_account.id
      );
    }
    // Send response with investment_accounts
    res.json({ investment_accounts });
  } catch (error) {
    console.error("Error fetching investment accounts:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch investment accounts" });
  }
};

// POST /investment-accounts - Create a new investment account
const createInvestmentAccount = async (req, res) => {
  const { title, description, initial_value, classroom_id } = req.body; // Extracting data from request body

  // Debug logs
  console.log("\n*** createInvestmentAccount ***");
  console.log(`  received data:
    title:${title}
    description:${description}
    initial_value:${initial_value}
    classroom_id:${classroom_id}`);

  // Prepared Statements
  const insertInvestmentAccountQuery =
    "INSERT INTO investment_account (fk_classroom_id, title, description) VALUES (?, ?, ?)";
  const getYearEndsQuery = "SELECT * FROM year_end WHERE fk_classroom_id = ?";
  const insertValueQuery =
    "INSERT INTO investment_values (fk_account_id, fk_year_end_id, share_value) VALUES (?, ?, ?)";
  const getStudentsQuery = "SELECT * FROM student WHERE fk_classroom_id = ?";
  const insertAccountQuery =
    "INSERT INTO account (fk_student_id, fk_investment_account_id, account_type) VALUES (?, ?, 3)";

  try {
    const connection = await db.getConnection();
    // Begin the database transaction (so changes are only saved if all are successful)
    await connection.beginTransaction();
    try {
      // Insert new investment account
      const [insertedInvestmentAccount] = await connection.execute(
        insertInvestmentAccountQuery,
        [classroom_id, title, description]
      );

      // Initialize investment_account object to return to frontend
      const investment_account = {
        id: insertedInvestmentAccount.insertId,
        fk_classroom_id: classroom_id,
        title,
        description,
        yearly_values: [],
      };

      // Get classroom year ends
      const [year_ends] = await connection.execute(getYearEndsQuery, [
        classroom_id,
      ]);

      for (const year_end of year_ends) {
        // For each year end, insert a corresponding investment value for the new account
        const [insertedInvestmentValue] = await connection.execute(
          insertValueQuery,
          [investment_account.id, year_end.id, initial_value]
        );
        // And a corresponding entry in the investment_account.yearly_values array
        investment_account.yearly_values.push({
          end_date: year_end.end_date,
          value: initial_value,
        });
      }

      // Get classroom students
      const [students] = await connection.execute(getStudentsQuery, [
        classroom_id,
      ]);
      for (const student of students) {
        // For each student, insert a corresponding account for the new investment account
        const [insertedAccount] = await connection.execute(insertAccountQuery, [
          student.id,
          investment_account.id,
        ]);
      }

      // All changes have been made.
      await connection.commit(); // Commit transaction changes
      connection.release();

      // Send response
      res.json({
        message: `Investment account created successfully with ID ${investment_account.id}`,
        investment_account,
      });
    } catch (error) {
      console.error("Error creating investment account:", error);
      // Rollback changes since start of transaction
      await connection.rollback();
      connection.release(); // Release the connection back to the pool
      return res
        .status(500)
        .json({ error: "Failed to create investment account" });
    }
  } catch (error) {
    console.error("Error creating investment account:", error);
    return res
      .status(500)
      .json({ error: "Failed to create investment account" });
  }
};

// PUT /investment-accounts - Update investment account details
const updateInvestmentAccount = async (req, res) => {
  const { id, account_type, balance, interest_rate } = req.body; // Extracting updated data from request body
  const query =
    "UPDATE investment_account SET account_type = ?, balance = ?, interest_rate = ? WHERE id = ?";
  // db.query(query, [account_type, balance, interest_rate, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating investment account:", err);
  //     return res
  //       .status(500)
  //       .send({ error: "Failed to update investment account" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Investment account not found" });
  //   }
  //   res.send({ data: `Investment account with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [
      account_type,
      balance,
      interest_rate,
      id,
    ]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Investment account not found" });
    }
    res.json({ data: `Investment account with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating investment account:", error);
    return res
      .status(500)
      .json({ error: "Failed to update investment account" });
  }
};

// DELETE /investment-accounts - Delete all investment accounts
const deleteInvestmentAccount = async (req, res) => {
  const query = "DELETE FROM investment_account";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting investment accounts:", err);
      return res
        .status(500)
        .send({ error: "Failed to delete investment accounts" });
    }
    res.send({ data: "All investment accounts deleted successfully" });
  });
  // try {
  //   const [results] = await db.execute(query);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// Routes definition using the functions above
router.get("/", getInvestmentAccounts); // Get all investment accounts
router.get("/classroom/:id", getInvestmentAccountsByClass); // Get all investment accounts for a particular classroom
router.post("/", createInvestmentAccount); // Create a new investment account
router.put("/", updateInvestmentAccount); // Update investment account details
router.delete("/", deleteInvestmentAccount); // Delete all investment accounts

module.exports = router;
