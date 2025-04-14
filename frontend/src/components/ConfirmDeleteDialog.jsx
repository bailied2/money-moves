import React, { useState } from "react";
// import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import api from "../api";

const ConfirmDeleteDialog = ({
  open, // Boolean prop for whether dialog is open or not
  onClose, // Function prop for when dialog is closed
  onSubmit, // Function prop for when form is submitted
  deleteTarget /* Object prop for the item to be deleted:
    Should follow the format:
      deleteTarget = {
        type: The type of object to be deleted, e.g. "classroom", "student", or "property"
        name: The name of the object to be deleted in plain text. Usually it's title, or first_name+" "+last_name for students, etc.
        id: The database id for the backend request path
        path: The path for the delete target's corresponding database table for the backend request path
          For example, if deleting a:
            classroom - path = "classrooms" => [ api.delete(`/classrooms/${deleteTarget.id}`) ]
            job       - path = "jobs" => [ api.delete(`/jobs/${deleteTarget.id}`) ]
        key: The value the user must type in order to confirm the deletion. Usually the target's name, but for classes it could be the class code.
        keyName: The name of the key in plain text for the confirmation message.
      }
  */,
}) => {
  const [confirmation_entry, setConfirmationEntry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Check if entered value matches the target's key
    if (confirmation_entry === deleteTarget.key) {
      // If so, make the delete request
      try {
        const response = await api.delete(
          `/${deleteTarget.path}/${deleteTarget.id}`
        );
        console.log(response.data); // Debug log
        onSubmit(response.data.deleteId || null); // Call onSubmit function with deleted ID (or null)
        alert(`${deleteTarget.name} deleted successfully!`);
        setConfirmationEntry(""); // Reset entry
      } catch (error) {
        console.error(
          `Error submitting form while attempting to delete ${deleteTarget.name}: ${error}`
        );
      }
    } else {
      // If entered value does not match, set error text.
      setError("Confirmation entry does not match.");
    }
  };

  const handleCancel = () => {
    setConfirmationEntry(""); // Reset entry
    onClose(); // Call onClose function
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle textTransform={"capitalize"}>
        Delete {deleteTarget.type}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete{" "}
          <Typography variant="h6" color="primary" sx={{ display: "inline" }}>
            {deleteTarget.name}
          </Typography>
          {" ?"}
          <br />
          This action cannot be undone.
          <br />
          <br />
          To delete{" "}
          <Typography variant="h6" color="primary" sx={{ display: "inline" }}>
            {deleteTarget.name}
          </Typography>{" "}
          , enter the {deleteTarget.keyName} below:
          <Stack
            direction="row"
            sx={{ width: "fit-content", alignItems: "center" }}
          >
            {deleteTarget.keyName} :{" "}
            <Typography
              component={Paper}
              variant="h6"
              sx={{ display: "inline", padding: "0 0.5rem", marginLeft: 1 }}
            >
              {deleteTarget.key}
            </Typography>
          </Stack>
        </Typography>
        <form onSubmit={handleSubmit} id="confirm_delete_form">
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            id="confirmation_entry"
            name="confirmation_entry"
            value={confirmation_entry}
            label={deleteTarget.keyName}
            variant="standard"
            onChange={(e) => {
              setConfirmationEntry(e.target.value);
            }}
            helperText={error}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          form="confirm_delete_form"
          variant="contained"
          color="error"
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ParentComponent = ({ onSubmit, deleteTarget }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (deleteId) => {
    console.log("Form submitted. Deleted ID:", deleteId);
    if (typeof onSubmit === "function") onSubmit(deleteId);
    handleClose();
  };

  return (
    <>
      <Button size="small" color="error" onClick={handleOpen}>
        Delete
      </Button>

      <ConfirmDeleteDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        deleteTarget={deleteTarget}
      />
    </>
  );
};

export default ParentComponent;
