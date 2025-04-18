import "./styles/CreateClassroomForm.css";

import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { AuthContext } from "../../AuthContext";
import api from "../../api";

const CreateClassroomForm = () => {
  const { user } = useContext(AuthContext);
  const current_date = dayjs().startOf("day");

  const [startDate, setStartDate] = useState(current_date);
  const [endDate, setEndDate] = useState(current_date.add(6, "M"));
  const [formData, setFormData] = useState({
    class_name: "",
    teacher_id: user?.id,
    start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
    end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
  });

  const handleStartDateChange = (value) => {
    setStartDate(dayjs(value));
    if (endDate.isBefore(dayjs(value).add(1, "day"))) {
      setEndDate(dayjs(value).add(1, "day"));
      setFormData({
        ...formData,
        start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
        end_date: dayjs(value).add(1, "day").format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      setFormData({
        ...formData,
        start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      });
    }
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
      const response = await api.post("/classrooms", formData);
      console.log(response.data);
      alert("Classroom added successfully!");
      setStartDate(current_date); // Reset start date
      setEndDate(current_date.add(6, "M")); // Reset end date
      setFormData({
        class_name: "",
        teacher_id: 1, // NEEDS TO BE MADE VARIABLE
        start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
        end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
      }); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}
      >
        <Typography variant="h5" gutterBottom>
          Create Classroom
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            // autoFocus
            required
            margin="normal"
            id="class_name"
            name="class_name"
            value={formData.class_name}
            label="Class Name"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, class_name: e.target.value });
            }}
            fullWidth
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              id="start_date"
              name="start_date"
              value={startDate}
              onChange={handleStartDateChange}
              minDate={dayjs().startOf("day")}
              disablePast
            ></DatePicker>
            <br />
            <br />
            <DatePicker
              label="End Date"
              id="end_date"
              name="end_date"
              value={endDate}
              minDate={startDate.add(1, "day")}
              onChange={handleEndDateChange}
              disablePast
            ></DatePicker>
          </LocalizationProvider>
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

export default CreateClassroomForm;
