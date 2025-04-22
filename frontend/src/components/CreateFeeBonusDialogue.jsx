import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Backdrop,
  CircularProgress,
  Fab,
  Card,
  CardActions,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../api"; // Assuming api is properly set up for backend requests

const CreateFeeBonusDialog = ({ open, onClose, onSubmit, classroomId }) => {
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    icon_class: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const response = await api.post("/fees-bonuses", {
        classroom_id: classroomId,
        formData,
      });
      onSubmit(response.data.data, "Fee/Bonus created successfully!");
      setFormData({
        title: "",
        amount: "",
        description: "",
        icon_class: "",
      });
    } catch (error) {
      console.error("Error submitting fee/bonus:", error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Fee/Bonus</DialogTitle>
      <DialogContent>
        {waiting && (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={waiting}
          >
            <CircularProgress />
          </Backdrop>
        )}
        <form onSubmit={handleSubmit} id="create_fee_bonus_form">
          <TextField
            required
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Amount"
            name="amount"
            type="number"
            inputProps={{ min: 0 }}
            value={formData.amount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Icon Class (optional)"
            name="icon_class"
            value={formData.icon_class}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="create_fee_bonus_form" variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ParentComponent = ({ onSubmit, classroomId }) => {
  const [open, setOpen] = useState(false);
  const fabRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      fabRef.current?.focus();
    }, 100);
  };

  const handleSubmit = (feeBonusData, message) => {
    if (typeof onSubmit === "function") onSubmit(feeBonusData, message);
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
          Create New Fee/Bonus
        </Typography>
        <Fab ref={fabRef} onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <CreateFeeBonusDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          classroomId={classroomId}
        />
      </CardActions>
    </Card>
  );
};

export default ParentComponent;
