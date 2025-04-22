import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import api from "../api";

const UpdateJobDialog = ({ open, onClose, jobData, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...jobData,
    is_trustee: jobData.is_trustee || false, // Default value for trustee field
  });

  useEffect(() => {
    setFormData({ ...jobData, is_trustee: jobData.is_trustee || false });
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/jobs/${jobData.id}`, {
        formData,
      });
      onUpdate(response.data); 
    } catch (err) {
      console.error("Failed to update job", err);
      alert("Failed to update job");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Job</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          {/* Job Title */}
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Job Description */}
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

          {/* Wage */}
          <Grid item xs={4}>
            <TextField
              label="Wage"
              name="wage"
              type="number"
              value={formData.wage || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Pay Frequency */}
          <Grid item xs={4}>
            <TextField
              label="Pay Frequency"
              name="pay_frequency"
              value={formData.pay_frequency || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Pay Day */}
          <Grid item xs={4}>
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

          {/* Icon Class */}
          <Grid item xs={6}>
            <TextField
              label="Icon Class"
              name="icon_class"
              value={formData.icon_class || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Trustee Checkbox */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_trustee || false}
                  onChange={handleChange}
                  name="is_trustee"
                />
              }
              label="Is Trustee?"
            />
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

export default UpdateJobDialog;
