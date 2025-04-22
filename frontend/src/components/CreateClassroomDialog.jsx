import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardActions,
  Typography,
  Fab,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import dayjs from "dayjs";
import api from "../api";

const CreateClassroomDialog = ({ open, onClose, onSubmit }) => {
  const current_date = dayjs().startOf("day");

  const [waiting, setWaiting] = useState(false);

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
    setWaiting(true);
    try {
      const response = await api.post("/classrooms", formData);
      console.log(response.data);
      const newClassroom = response.data.classroom;
      onSubmit(newClassroom, response.data.message);
      setStartDate(current_date); // Reset start date
      setEndDate(current_date.add(6, "M")); // Reset end date
      setFormData({
        class_name: "",
        start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
        end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
      }); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Classroom</DialogTitle>
      <DialogContent>
        {waiting && (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={waiting}
          >
            <CircularProgress />
          </Backdrop>
        )}
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
            />
            <br />
            <br />
            <DatePicker
              label="End Date"
              id="end_date"
              name="end_date"
              value={endDate}
              minDate={startDate.add(1, "day")}
              onChange={handleEndDateChange}
            />
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

  const handleSubmit = (classroom, message) => {
    console.log(
      "Form submitted.\nClassroom:",
      classroom,
      "\nMessage: ",
      message
    );
    if (typeof onSubmit === "function") onSubmit(classroom, message);
    handleClose();
  };

  return (
    <Card
      sx={{
        boxShadow: 0,
        position: "relative",
        minHeight: 200,
        aspectRatio: "3/2",
        padding: 1,
        border: "3px dashed lightgrey",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          gap: 2,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="button" align="center">
          Create New Classroom
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <CreateClassroomDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </CardActions>
    </Card>
  );
};

export default ParentComponent;
///model this