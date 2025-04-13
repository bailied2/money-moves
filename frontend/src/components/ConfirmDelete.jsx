import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import api from "../api";

const ConfirmDelete = ({
  open,
  onClose,
  onSubmit,
  routeName,
  deleteId,
  confirmationMessage,
  confirmationKey,
}) => {
  const [confirmation_entry, setConfirmationEntry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (confirmation_entry === confirmationKey) {
      try {
        const response = await api.delete(`/${routeName}/${deleteId}`);
        console.log(response.data);
        onSubmit(response.data);
        alert("Deleted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setError("Confirmation entry does not match");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirm Delete?</DialogTitle>
      <DialogContent>
        <Typography>{confirmationMessage}</Typography>
        <form onSubmit={handleSubmit} id="confirm_delete_form">
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            id="confirmation_entry"
            name="confirmation_entry"
            value={confirmation_entry}
            variant="standard"
            onChange={(e) => {
              setConfirmationEntry(e.target.value);
            }}
            helperText={error}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          form="confirm_delete_form"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ParentComponent = ({
  onSubmit,
  routeName,
  deleteId,
  confirmationMessage,
  confirmationKey,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    if (typeof onSubmit === "function") onSubmit(data);
    handleClose();
  };

  return (
    <Button size="small" color="error" onClick={handleOpen}>
      <ConfirmDelete
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        routeName={routeName}
        deleteId={deleteId}
        confirmationMessage={confirmationMessage}
        confirmationKey={confirmationKey}
      />
    </Button>
  );
};

export default ParentComponent;
