import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import api from "../api";

const UpdatePropertyDialog = ({ open, onClose, propertyData, onUpdate }) => {
  const [formData, setFormData] = useState({ ...propertyData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/properties/${propertyData.id}`, {
        formData,
      });
      onUpdate(response.data); 
    } catch (err) {
      console.error("Failed to update property", err);
      alert("Failed to update property");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              label="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Value"
              name="value"
              type="number"
              value={formData.value || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Rent"
              name="rent"
              type="number"
              value={formData.rent || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Maintenance"
              name="maintenance"
              type="number"
              value={formData.maintenance || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Pay Frequency"
              name="pay_frequency"
              value={formData.pay_frequency || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Pay Day"
              name="pay_day"
              value={formData.pay_day || ""}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Sunday">Sunday</MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePropertyDialog;
