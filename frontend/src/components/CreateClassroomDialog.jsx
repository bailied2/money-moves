import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import api from "../api";

const CustomFormDialog = ({ open, onClose, onSubmit }) => {
  const current_date = dayjs().startOf("day");

  const [startDate, setStartDate] = useState(current_date);
  const [endDate, setEndDate] = useState(current_date.add(6, "M"));
  const [formData, setFormData] = useState({
    class_name: "",
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
    // alert(`
    //   class_name: ${formData.class_name}
    //   start_date: ${formData.start_date}
    //   end_date: ${formData.end_date}
    //   `);
    try {
      const response = await api.post("/classrooms", formData);
      console.log(response.data);
      onSubmit(response.data.classroom);
      alert("Classroom added successfully!");
      setStartDate(current_date); // Reset start date
      setEndDate(current_date.add(6, "M")); // Reset end date
      setFormData({
        class_name: "",
        start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
        end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
      }); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Classroom</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="create_classroom_form">
          <TextField
            // autoFocus
            required
            fullWidth
            margin="normal"
            id="class_name"
            name="class_name"
            value={formData.class_name}
            label="Class Name"
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, class_name: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              id="start_date"
              name="start_date"
              value={startDate}
              onChange={handleStartDateChange}
              minDate={dayjs().startOf("day")}
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
            ></DatePicker>
          </LocalizationProvider>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          form="create_classroom_form"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ParentComponent = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    if (typeof onSubmit === "function") onSubmit(data);
    handleClose();
  };

  return (
    <>
      <Fab onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <CustomFormDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ParentComponent;
