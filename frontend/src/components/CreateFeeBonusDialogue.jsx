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
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import api from "../api";

const CreateFeeBonusDialog = ({ open, onClose, onSubmit }) => {
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const response = await api.post("/fees-bonuses", formData);
      console.log(response.data);
      onSubmit(newFeeBonus); 
      alert(response.data.message || "Fee/Bonus successfully created!");
      setFormData({ 
        title: "",
        description: "", 
        amount: "" });
    } catch (error) {
      console.error("Error submitting fee/bonus:", error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Fee or Bonus</DialogTitle>
      <DialogContent>
        {waiting && (
          <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={waiting}>
            <CircularProgress />
          </Backdrop>
        )}
        <form onSubmit={handleSubmit} id="create_fee_bonus_form">
          <TextField
            required
            fullWidth
            margin="normal"
            label="Title"
            variant="standard"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            variant="standard"
            multiline
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Amount"
            variant="standard"
            type="number"
            helperText="Use a negative value for a fee, positive for a bonus"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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

const ParentComponent = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (data) => {
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
          Create Fee or Bonus
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <CreateFeeBonusDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
      </CardActions>
    </Card>
  );
};

export default ParentComponent;
