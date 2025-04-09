const express = require("express");
const router = express.Router();
const db = require("../../sample_database");

const getProperties = async (req, res) => {
  const query = "SELECT * FROM property";

  try {
    // Log before executing the query
    console.log("Executing query:", query);

    const [results] = await db.execute(query);

    // Log the results to see what data was returned
    console.log("Query results:", results);

    // Check if results are empty
    if (results.length === 0) {
      console.log("No properties found.");
    }

    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ error: "Failed to fetch properties" });
  }
};


// GET /properties/:id - Get a specific property by ID
const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM property WHERE fk_classroom_id = ?";
  // db.query(query, [id], (err, results) => {
  //   if (err) {
  //     console.error("Error fetching property by ID:", err);
  //     return res.status(500).send({ error: "Failed to fetch property" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).send({ error: "Property not found" });
  //   }
  //   res.send({ data: results[0] });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ data: results[0] });
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return res.status(500).json({ error: "Failed to fetch property" });
  }
};

// POST /properties - Create a new property
const createProperty = async (req, res) => {
  
  const { classroom_id, title, description, value, rent, maintenance, pay_frequency, pay_day, icon_class } = req.body;
  console.log("Request Body:", req.body);
  // Extracting data from request body
  const query =
    "INSERT INTO property (fk_classroom_id, title, description, value, rent, maintenance, pay_frequency, pay_day, icon_class) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  // db.query(
  //   query,
  //   [name, value, rent, maintenance_cost, owner_id],
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error creating property:", err);
  //       return res.status(500).send({ error: "Failed to create property" });
  //     }
  //     res.send({
  //       data: `New property created successfully with ID ${result.insertId}`,
  //     });
  //   }
  // );
  try {
    const result = await db.execute(query, [
      classroom_id,
      title,
      description,
      value,
      rent,
      maintenance, 
      pay_frequency,
      pay_day,
      icon_class,

    ]);
    res.json({
      data: `New property created successfully with ID ${result.insertId}`,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ error: "Failed to create property" });
  }
};

// PUT /properties/:id - Update a specific property by ID
const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { name, value, rent, maintenance_cost } = req.body; // Extracting updated data from request body
  const query =
    "UPDATE property SET title = ?, description = ?, value = ?, rent = ? maintenance = ?, pay_frequency = ?, pay_day = ?, icon_class = ?";
    // classroom_id, title, description, value, rent, maintenance, pay_frequency, pay_day, icon_class
  // db.query(query, [name, value, rent, maintenance_cost, id], (err, result) => {
  //   if (err) {
  //     console.error("Error updating property:", err);
  //     return res.status(500).send({ error: "Failed to update property" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Property not found" });
  //   }
  //   res.send({ data: `Property with ID ${id} updated successfully` });
  // });
  try {
    const [results] = await db.execute(query, [
      name,
      value,
      rent,
      maintenance_cost,
      id,
    ]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ data: `Property with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ error: "Failed to update property" });
  }
};

// DELETE /properties/:id - Delete a specific property by ID
const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM property WHERE id = ?";
  // db.query(query, [id], (err, result) => {
  //   if (err) {
  //     console.error("Error deleting property:", err);
  //     return res.status(500).send({ error: "Failed to delete property" });
  //   }
  //   if (result.affectedRows === 0) {
  //     return res.status(404).send({ error: "Property not found" });
  //   }
  //   res.send({ data: `Property with ID ${id} deleted successfully` });
  // });
  try {
    const [results] = await db.execute(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ data: `Property with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res.status(500).json({ error: "Failed to delete property" });
  }
};

// Routes definition using the functions above
router.get("/properties", getProperties); // Get all properties
router.get("/properties/:id", getPropertyById); // Get a property by ID
router.post("/properties", createProperty); // Create a new property
router.put("/Updateproperty/:id", updateProperty); // Update a property by ID
router.delete("/properties/:id", deleteProperty); // Delete a property by ID

module.exports = router;
