import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import api from "../api";

const AddStudentCard = ({ classroom = null, onSubmit }) => {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classroom) {
      alert("No classroom prop! Cannot submit form.");
    } else {
      try {
        const response = await api.post("/students/classroom/add", {
          students: [formData],
          classroom,
        });
        if (typeof onSubmit === "function") {
          onSubmit(response.data.students);
        }
        alert("Student added successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
        }); // Reset form data
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  // sx={{
  //   position: "relative",
  //   minHeight: 185,
  //   maxWidth: 300,
  //   aspectRatio: "3/2",
  //   padding: 1,
  //   borderRadius: 2,
  //   display: "flex",
  //   flexDirection: "column",
  // }}
  if (opened)
    return (
      <Card
        raised
        sx={{
          position: "relative",
          overflow: "visible",
          maxWidth: 300,
          aspectRatio: "3/2",
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent >
          <form onSubmit={handleSubmit} id="add_student_form">
            <Typography variant="h5">
              Add Student
              <Button variant="outlined" size="small" sx={{ marginLeft: 2 }}>
                Import
              </Button>
            </Typography>
            <TextField
              size="small"
              variant="standard"
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              size="small"
              variant="standard"
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              size="small"
              variant="standard"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" type="submit" form="add_student_form">
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
        position: "relative",
        minHeight: 185,
        maxWidth: 300,
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
          Add Student
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};

export default AddStudentCard;
