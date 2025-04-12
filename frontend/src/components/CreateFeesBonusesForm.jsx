import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import api from "../api";

const CreateFeesBonusesForm = ({ fk_classroom_id }) => {
  const [formData, setFormData] = useState({
    fk_classroom_id,
    title: "",
    description: "",
    amount: "",
    icon_class: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/fees-bonuses", formData);
      console.log("Fee/Bonus Created:", response.data);
      alert("Fee/Bonus added successfully!");
      setFormData({
        fk_classroom_id,
        title: "",
        description: "",
        amount: "",
        icon_class: "",
      });
    } catch (error) {
      console.error("Error submitting fee/bonus:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}
      >
        <Typography variant="h5" gutterBottom>
          Create Fee / Bonus
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="normal"
            id="title"
            name="title"
            value={formData.title}
            label="Title"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="normal"
            id="description"
            name="description"
            value={formData.description}
            label="Description"
            variant="standard"
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            required
            margin="normal"
            id="amount"
            name="amount"
            value={formData.amount}
            label="Amount"
            variant="standard"
            type="number"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="normal"
            id="icon_class"
            name="icon_class"
            value={formData.icon_class}
            label="Icon Class (e.g., fas fa-coins)"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateFeesBonusesForm;
