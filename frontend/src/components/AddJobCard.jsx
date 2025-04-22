import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import api from "../api";

const AddJobCard = ({ classroom = null, onSubmit }) => {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    wage: "",
    pay_frequency: "Monthly",
    pay_day: "Monday", 
    icon_class: "",
    is_trustee: false,
  });

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classroom) {
      alert("No classroom provided. Cannot submit.");
      return;
    }
  
    try {
      const response = await api.post("/jobs", {
        formData: { 
          title: formData.title,
          description: formData.description,
          wage: formData.wage,
          pay_frequency: formData.pay_frequency,
          pay_day: formData.pay_day,
          icon_class: formData.icon_class,
          is_trustee: formData.is_trustee,
          classroom_id: classroom.id,
        },
      });
  
      if (typeof onSubmit === "function") {
        onSubmit(response.data.job);
      }
  
      alert("Job added successfully!");
      setFormData({
        title: "",
        description: "",
        wage: "",
        pay_frequency: "Monthly",
        pay_day: "Monday",
        icon_class: "",
        is_trustee: false,
      });
      handleClose();
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };
  

  if (opened)
    return (
      <Card
        raised
        sx={{
          bgcolor: "#FA7921",
          maxWidth: 600,
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit} id="add_job_form">
            <Typography variant="h5">Add Job</Typography>
            <TextField
              size="small"
              variant="standard"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              size="small"
              variant="standard"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              size="small"
              variant="standard"
              label="Wage"
              name="wage"
              type="number"
              value={formData.wage}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
            />
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Pay Frequency</InputLabel>
              <Select
                name="pay_frequency"
                value={formData.pay_frequency}
                onChange={handleChange}
                label="Pay Frequency"
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>

            {/* Pay Day Dropdown with Days of the Week */}
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Pay Day</InputLabel>
              <Select
                name="pay_day"
                value={formData.pay_day}
                onChange={handleChange}
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

            <TextField
              size="small"
              variant="standard"
              label="Icon Class"
              name="icon_class"
              value={formData.icon_class}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Is Trustee?</InputLabel>
              <Select
                name="is_trustee"
                value={formData.is_trustee}
                onChange={handleChange}
                label="Is Trustee?"
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
            </FormControl>
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" type="submit" form="add_job_form">
            Submit
          </Button>
          <Button size="small" onClick={handleClose} color="error">
            Cancel
          </Button>
        </CardActions>
      </Card>
    );

  return (
    <Card
      sx={{
        boxShadow: 0,
        minHeight: 185,
        maxWidth: 600,
        padding: 1,
        border: "3px dashed lightgrey",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardActions
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          padding: 3,
        }}
      >
        <Typography variant="button" align="center">
          Add Job
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};

export default AddJobCard;
