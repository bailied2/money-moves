import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

const CreateJobDialog = ({ open, onClose, onCreateJob }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [wage, setWage] = useState("");
  const [payFrequency, setPayFrequency] = useState("");
  const [payDay, setPayDay] = useState("");
  const [iconClass, setIconClass] = useState("");
  const [isTrustee, setIsTrustee] = useState(false);

  const handleCreateJob = () => {
    const jobData = { title, description, wage, payFrequency, payDay, iconClass, isTrustee };
    onCreateJob(jobData);
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setWage("");
    setPayFrequency("");
    setPayDay("");
    setIconClass("");
    setIsTrustee(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Job</DialogTitle>
      <DialogContent>
        <TextField
          label="Job Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Wage"
          fullWidth
          type="number"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Pay Frequency"
          fullWidth
          value={payFrequency}
          onChange={(e) => setPayFrequency(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Pay Day"
          fullWidth
          value={payDay}
          onChange={(e) => setPayDay(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Icon Class"
          fullWidth
          value={iconClass}
          onChange={(e) => setIconClass(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isTrustee}
              onChange={() => setIsTrustee(!isTrustee)}
              color="primary"
            />
          }
          label="Is Trustee"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateJob} color="primary">
          Create Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateJobDialog;
