import "./styles/CreateFeeBonusForm.css";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Container, Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, Paper } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../api"; 

const CreateFeeBonusForm = () => {
  const current_date = dayjs().startOf("day");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    icon_class: "",
    fk_classroom_id: "", 
    start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
    end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
  });

  const [startDate, setStartDate] = useState(current_date);
  const [endDate, setEndDate] = useState(current_date.add(6, "M"));

  const handleStartDateChange = (value) => {
    setStartDate(dayjs(value));
    setFormData({
      ...formData,
      start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const handleEndDateChange = (value) => {
    setEndDate(dayjs(value));
    setFormData({
      ...formData,
      end_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/fees_bonuses", formData);
      console.log(response.data);
      alert("Fee/Bonus created successfully!");
      setStartDate(current_date); // Reset start date
      setEndDate(current_date.add(6, "M")); // Reset end date
      setFormData({
        title: "",
        description: "",
        amount: "",
        icon_class: "",
        fk_classroom_id: "", // Reset classroom selection
        start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
        end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
      }); // Reset form data
    } catch (error) {
      console.error("Error creating fee/bonus:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h5" gutterBottom>
          Create Fee/Bonus
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Fee/Bonus Title */}
          <TextField
            required
            margin="normal"
            id="title"
            name="title"
            value={formData.title}
            label="Title"
            variant="standard"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <br />
          <br />

          {/* Fee/Bonus Description */}
          <TextField
            required
            margin="normal"
            id="description"
            name="description"
            value={formData.description}
            label="Description"
            variant="standard"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
          />
          <br />
          <br />

          {/* Amount */}
          <TextField
            required
            margin="normal"
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            label="Amount"
            variant="standard"
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            fullWidth
          />
          <br />
          <br />

          {/* Classroom Selection */}
          <FormControl fullWidth required margin="normal">
            <InputLabel>Classroom</InputLabel>
            <Select
              name="fk_classroom_id"
              value={formData.fk_classroom_id}
              onChange={(e) => setFormData({ ...formData, fk_classroom_id: e.target.value })}
            >
              {/* Replace with actual classroom data from the backend */}
              <MenuItem value={1}>Classroom 1</MenuItem>
              <MenuItem value={2}>Classroom 2</MenuItem>
              <MenuItem value={3}>Classroom 3</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />

          {/* Icon Class */}
          <TextField
            margin="normal"
            id="icon_class"
            name="icon_class"
            value={formData.icon_class}
            label="Icon Class (Optional)"
            variant="standard"
            onChange={(e) => setFormData({ ...formData, icon_class: e.target.value })}
            fullWidth
          />
          <br />
          <br />

          {/* Date Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              minDate={dayjs().startOf("day")}
              disablePast
            />
            <br />
            <br />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              minDate={startDate.add(1, "day")}
              disablePast
            />
          </LocalizationProvider>
          <br />
          <br />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Fee/Bonus
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateFeeBonusForm;
