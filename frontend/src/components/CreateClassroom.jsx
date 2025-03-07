import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const CreateClassroom = ({ label }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    class_name: "",
    start_date: dayjs(),
    end_date: dayjs(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "start_date" && formData.end_date < value) {
      setFormData({ ...formData, end_date: value });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              console.log("Class Name: ", formJson.class_name);
              console.log("Start Date: ", formJson.start_date);
              console.log("End Date: ", formJson.end_date);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Create Classroom</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Stack sx={{ gap: 1 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="class_name"
              name="class_name"
              value={formData.class_name}
              label="Class Name"
              variant="standard"
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange.bind({}, ["start_date"])}
                disablePast
              ></DatePicker>
              <DatePicker
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                disablePast
              ></DatePicker>
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateClassroom;
