// import "./styles/CreateJobForm.css";

import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../api";

const CreateFeesBonusesForm = ({ classroom_id }) => {
  const current_date = dayjs().startOf("day");

  console.log("Creating feesbonuses form.");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    icon_class: "",
  });
  console.log(formData);
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
    console.log("Attempting form submit");
    e.preventDefault();
    try {
      //debug
      console.log("Form data before submitting", formData);

      //
      const response = await api.post("/fees-bonuses", {formData, classroom_id: classroom_id});
      console.log(response.data);
        // console.log(response.data);
        alert("fee/bonus added successfully!");
        setStartDate(current_date);
        setEndDate(current_date.add(6, "M"));
        setFormData({
          title: "",
          description: "",
          amount: "",
          icon_class: "",
          start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
          end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
        }); 
     // Reset form data
    } catch (error) {
      console.error("Error creating fee/bonus:", error);
    }

      
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Create Fee and Bonuses
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="normal"
            id="title"
            name="title"
            value={formData.title}
            label="feesbonuses Title"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            fullWidth
          />
          <br />
          <TextField
            required
            margin="normal"
            id="description"
            name="description"
            value={formData.description}
            label="feesbonuses Description"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            fullWidth
          />
          <br />
          <TextField
            required
            margin="normal"
            id="amount"
            name="amount"
            value={formData.amount}
            label="amount"
            variant="standard"
            type="number"
            onChange={(e) => {
              setFormData({ ...formData, amount: e.target.value });
            }}
            fullWidth
          />
          
          
          <TextField
            required
            margin="normal"
            id="icon_class"
            name="icon_class"
            value={formData.icon_class}
            label="Icon Class"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, icon_class: e.target.value });
            }}
            fullWidth
          />
          <br />
  
          <br />
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
