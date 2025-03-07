import "./styles/CreateClassroomForm.css";

import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import axios from "axios";

const CreateClassroomForm = () => {
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [endDate, setEndDate] = useState(dayjs().startOf("day").add(6, "M"));
  const [formData, setFormData] = useState({
    class_name: "",
    start_date: startDate,
    end_date: endDate,
  });

  const handleStartDateChange = (value) => {
    setStartDate(dayjs(value));
    if (endDate.isBefore(dayjs(value).add(1, "day"))) {
      setEndDate(dayjs(value).add(1, "day"));
    }
    setFormData({ ...formData, start_date: startDate, end_date: endDate})
  }

  const handleEndDateChange = (value) => {
    setEndDate(dayjs(value));
    setFormData({ ...formData, end_date: endDate})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      class_name: ${formData.class_name}
      start_date: ${formData.start_date}
      end_date: ${formData.end_date}
      `);
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
            autoFocus
            required
            margin="normal"
            id="class_name"
            name="class_name"
            value={formData.class_name}
            label="Class Name"
            variant="standard"
            onChange={(e) => {setFormData({...formData, class_name: e.value})}}
            fullWidth
          /><br /><br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              name="start_date"
              value={startDate}
              onChange={handleStartDateChange}
              minDate={dayjs().startOf("day")}
            ></DatePicker><br /><br />
            <DatePicker
              label="End Date"
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
      // <Dialog
      //   open={open}
      //   onClose={handleClose}
      //   slotProps={{
      //     paper: {
      //       component: "form",
      //       onSubmit: (event) => {
      //         event.preventDefault();
      //         const formData = new FormData(event.currentTarget);
      //         const formJson = Object.fromEntries(formData.entries());
      //         console.log("Class Name: ", formJson.class_name);
      //         console.log("Start Date: ", formJson.start_date);
      //         console.log("End Date: ", formJson.end_date);
      //         handleClose();
      //       },
      //     },
      //   }}
      // >
      //   <DialogTitle>Create Classroom</DialogTitle>
      //   <DialogContent>
      //     {/* <DialogContentText>
      //       To subscribe to this website, please enter your email address here.
      //       We will send updates occasionally.
      //     </DialogContentText> */}

      //   </DialogContent>
      //   <DialogActions>
      //     <Button onClick={handleClose}>Cancel</Button>
      //     <Button type="submit">Create</Button>
      //   </DialogActions>
      // </Dialog>
  );
};

export default CreateClassroomForm;
