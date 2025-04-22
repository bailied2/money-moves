import React, { useState, useRef } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import api from "../api";

const payFrequencies = [
  { value: "Weekly", label: "Weekly" },
  { value: "Biweekly", label: "Biweekly" },
  { value: "Monthly", label: "Monthly" },
];

const CreateJobDialog = ({ open, onClose, onSubmit, classroomId }) => {
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    wage: "",
    description: "",
    pay_frequency: "Weekly",
    pay_day: "",
    icon_class: "",
    is_trustee: false,
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
      const response = await api.post("/jobs", {
        classroom_id: classroomId,
        formData,
      });
      onSubmit(response.data.data, "Job created successfully!");
      setFormData({
        title: "",
        wage: "",
        description: "",
        pay_frequency: "Weekly",
        pay_day: "",
        icon_class: "",
        is_trustee: false,
      });
    } catch (error) {
      console.error("Error submitting job:", error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Job</DialogTitle>
      <DialogContent>
        {waiting && (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={waiting}
          >
            <CircularProgress />
          </Backdrop>
        )}
        <form onSubmit={handleSubmit} id="create_job_form">
          <TextField
            required
            fullWidth
            margin="normal"
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Wage"
            name="wage"
            type="number"
            inputProps={{ min: 0 }}
            value={formData.wage}
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
            select
            fullWidth
            margin="normal"
            label="Pay Frequency"
            name="pay_frequency"
            value={formData.pay_frequency}
            onChange={handleChange}
          >
            {payFrequencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Pay Day"
            name="pay_day"
            value={formData.pay_day}
            onChange={handleChange}
            placeholder="e.g., Friday or 15"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Icon Class (optional)"
            name="icon_class"
            value={formData.icon_class}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_trustee}
                onChange={handleChange}
                name="is_trustee"
              />
            }
            label="Trustee Role"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="create_job_form" variant="contained" color="primary">
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

  const handleSubmit = (jobData, message) => {
    if (typeof onSubmit === "function") onSubmit(jobData, message);
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
          Create New Job
        </Typography>
        <Fab ref={fabRef} onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <CreateJobDialog
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
