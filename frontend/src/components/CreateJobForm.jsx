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

const CreateJobForm = ({ classroom_id }) => {
  const current_date = dayjs().startOf("day");

  console.log("Creating job form.");

  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    wage: "",
    pay_frequency: "Weekly",
    pay_day: "",
    icon_class: "",
    is_trustee: false,
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
    console.log("Attempting form submit");
    e.preventDefault();
    try {
      //debug
      console.log("Form data before submitting", formData);
      const response = await api.post("/jobs", {
        formData,
        classroom_id: classroom_id,
      });
      console.log(response.data);
      alert("Job added successfully!");
      setStartDate(current_date);
      setEndDate(current_date.add(6, "M"));
      setFormData({
        job_title: "",
        job_description: "",
        wage: "",
        pay_frequency: "Weekly",
        pay_day: "",
        icon_class: "",
        is_trustee: false,
      }); // Reset form data
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Create Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="normal"
            id="job_title"
            name="job_title"
            value={formData.job_title}
            label="Job Title"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, job_title: e.target.value });
            }}
            fullWidth
          />
          <br />
          <TextField
            required
            margin="normal"
            id="job_description"
            name="job_description"
            value={formData.job_description}
            label="Job Description"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, job_description: e.target.value });
            }}
            fullWidth
          />
          <br />
          <TextField
            required
            margin="normal"
            id="wage"
            name="wage"
            value={formData.wage}
            label="Wage"
            variant="standard"
            type="number"
            onChange={(e) => {
              setFormData({ ...formData, wage: e.target.value });
            }}
            fullWidth
          />
          <br />
          <FormControl fullWidth margin="normal">
            <InputLabel>Pay Frequency</InputLabel>
            <Select
              required
              id="pay_frequency"
              value={formData.pay_frequency}
              onChange={(e) => {
                setFormData({ ...formData, pay_frequency: e.target.value });
              }}
              label="Pay Frequency"
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <br />
          {formData.pay_frequency !== "Daily" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Pay Day</InputLabel>
              <Select
                id="pay_day"
                value={formData.pay_day}
                onChange={(e) => {
                  setFormData({ ...formData, pay_day: e.target.value });
                }}
                label="Pay Day"
              >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </FormControl>
          )}
          <br />
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
          <FormControl margin="normal">
            <InputLabel>Is Trustee</InputLabel>
            <Select
              id="is_trustee"
              value={formData.is_trustee}
              onChange={(e) => {
                setFormData({ ...formData, is_trustee: e.target.value });
              }}
              label="Is Trustee"
              sx={{
                minWidth: "10rem",
              }}
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>
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
export default CreateJobForm;
