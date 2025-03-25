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
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";

import api from "../api";

const AddStudentDialog = ({ open, onClose, onSubmit }) => {
  const [classCode, setClassCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/classrooms/join/${classCode}`);
      console.log(response.data);
      onSubmit(response.data.classroom);
      alert("Classroom joined successfully!");
      navigate("/classroom/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Join Classroom By Code</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="join_classroom_form">
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            id="class_code"
            name="class_code"
            value={classCode}
            label="Class Code"
            variant="standard"
            onChange={(e) => {
              setClassCode(e.target.value);
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          form="join_classroom_form"
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
          Join Classroom
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <AddStudentDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </CardActions>
    </Card>
  );
};

export default ParentComponent;
