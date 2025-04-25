const express = require("express");
const router = express.Router();
const db = require("../../sample_database");
const { assign } = require("nodemailer/lib/shared");

const authenticateToken = require("../../authMiddleware");

// GET /properties/:id - Get a specific property by ID
const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM property WHERE id= ?";
  console.log("Request Body:", req.body);
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
  const {
    title,
    description,
    value,
    rent,
    maintenance,
    pay_frequency,
    pay_day,
    classroom_id,
  } = req.body;
  console.log("\n*** createProperty ***");
  console.log("Request Body:", req.body);
  // getting data from request body
  const query =
    "INSERT INTO property ( fk_classroom_id, title, description, value, rent, maintenance, pay_frequency, pay_day, icon_class) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '')";

  try {
    const results = await db.execute(query, [
      classroom_id,
      title,
      description,
      value,
      rent,
      maintenance,
      pay_frequency,
      pay_day,
    ]);
    res.json({
      data: `New property created successfully `,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ error: "Failed to create property" });
  }
};

// PUT /properties/:id - Update a specific property by ID
const updateProperty = async (req, res) => {
  const {
    title,
    description,
    value,
    rent,
    maintenance,
    pay_frequency,
    pay_day,
    icon_class,
  } = req.body.formData; // Extracting updated data from request body
  const { id } = req.params;
  console.log("Request Body:", req.body);
  const query =
    "UPDATE property SET title = ?, description = ?, value = ?, rent = ?, maintenance = ?, pay_frequency = ?, pay_day = ?, icon_class = ? WHERE id = ?";

  console.log([
    title,
    description,
    value,
    rent,
    maintenance,
    pay_frequency,
    pay_day,
    icon_class,
    id,
  ]);

  try {
    const [results] = await db.execute(query, [
      title,
      description,
      value,
      rent,
      maintenance,
      pay_frequency,
      pay_day,
      icon_class,
      id,
    ]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ data: `Property updated successfully` });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ error: "Failed to update property" });
  }
};

// GET /properties/classroom/:id - Get all properties in a particular classroom
router.get("/classroom/:id", authenticateToken, async (req, res) => {
  // const user_id = req.user.id;
  const classroom_id = req.params.id;

  // Debug logs
  console.log("\n*** GET /properties/classroom/:id ***");

  console.log("  classroom_id: ", classroom_id);

  const selectPropertiesQuery =
    "SELECT * FROM property WHERE fk_classroom_id = ?";

  const selectStudentsQuery = `SELECT * FROM student_profile 
    RIGHT JOIN student_properties
    ON student_profile.student_id = student_properties.fk_student_id
    WHERE student_properties.fk_property_id = ?`;

  try {
    const [properties] = await db.execute(selectPropertiesQuery, [
      classroom_id,
    ]);
    for (const property of properties) {
      const [assigned_students] = await db.execute(selectStudentsQuery, [
        property.id,
      ]);
      property.assigned_students = assigned_students;
    }
    res.json({ properties });
  } catch (error) {
    console.error("Error fetching properties: ", error);
    res.status(500).json({ error: error.message });
  }
});

//get all the properties in a specific classroom
const getProperties = async (req, res) => {
  const { id } = req.params;
  console.log("Request Body:", req.body);

  try {
    const query = "SELECT * FROM property WHERE fk_classroom_id = ?";
    const [results] = await db.execute(query, [id]);

    console.log("Query results:", results);

    if (results.length === 0) {
      console.log("No properties found.");
    }

    res.json({ properties: results }); // Make sure this matches your frontend expectation
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// DELETE /properties/:id - Delete a specific property by ID
const deleteProperty = async (req, res) => {
  const { id } = req.params;
  console.log("Request Body:", req.body);
  const query = "DELETE FROM property WHERE id = ?";

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

const assignProperty = async (req, res) => {
  const { student_ids, property_id } = req.body;

  if (!Array.isArray(student_ids) || !property_id) {
    return res.status(400).send({ error: "Missing property_id or student_ids" });
  }

  const query =
    "INSERT INTO student_properties (fk_student_id, fk_property_id) VALUES (?, ?)";

  try {
    for (const student_id of student_ids) {
      await db.execute(query, [student_id, property_id]);
    }

    res.json({ data: "Property assigned successfully" });
  } catch (err) {
    console.error("Error assigning property:", err);
    return res.status(500).send({ error: "Failed to assign property" });
  }
};


// Routes definition using the functions above
// router.get("/classroom/:id", getProperties); // Get all properties in a classroom
router.get("/:id", getPropertyById); // Get a property by ID
router.post("/", createProperty); // Create a new property
router.put("/:id", updateProperty); // Update a property by ID
router.delete("/:id", deleteProperty); // Delete a property by ID
router.post("/:id", assignProperty); // assign a property to a student

module.exports = router;
