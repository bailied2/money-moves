import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import api from "../api";

const CreatePropertyDialogue = ({ open, onClose, fk_classroom_id, onSubmit }) => {
  const current_date = dayjs().startOf("day");
  const [waiting, setWaiting] = useState(false);

  const [startDate, setStartDate] = useState(current_date);
  const [endDate, setEndDate] = useState(current_date.add(6, "M"));
  const [formData, setFormData] = useState({
    classroom_id: fk_classroom_id,
    title: "",
    description: "",
    value: "",
    rent: "",
    maintenance: "",
    pay_frequency: "Weekly",
    pay_day: "Monday",
    icon_class: "",
    start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
    end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
  });

  const handleStartDateChange = (value) => {
    setStartDate(dayjs(value));
    if (endDate.isBefore(dayjs(value).add(1, "day"))) {
      const newEnd = dayjs(value).add(1, "day");
      setEndDate(newEnd);
      setFormData({
        ...formData,
        start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
        end_date: newEnd.format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      setFormData({
        ...formData,
        start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  };

  const handleEndDateChange = (value) => {
    setEndDate(dayjs(value));
    setFormData({
      ...formData,
      end_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const response = await api.post("/properties", {
        formData: formData,
        classroom_id: fk_classroom_id,
      });
      console.log("Created:", response.data);
      onSubmit(response.data);
      alert("Property created successfully!");
      setStartDate(current_date);
      setEndDate(current_date.add(6, "M"));
      setFormData({
        classroom_id: fk_classroom_id,
        title: "",
        description: "",
        value: "",
        rent: "",
        maintenance: "",
        pay_frequency: "Weekly",
        pay_day: "Monday",
        icon_class: "",
        start_date: current_date.format("YYYY-MM-DD HH:mm:ss"),
        end_date: current_date.add(6, "M").format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (error) {
      console.error("Error creating property:", error);
    } finally {
      setWaiting(false);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Property</DialogTitle>
      <DialogContent>
        {waiting && (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={waiting}>
            <CircularProgress />
          </Backdrop>
        )}
        <form onSubmit={handleSubmit} id="create_property_form">
          <TextField
            required
            fullWidth
            margin="normal"
            label="Property Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            type="number"
            label="Value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            type="number"
            label="Rent"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            type="number"
            label="Maintenance"
            value={formData.maintenance}
            onChange={(e) => setFormData({ ...formData, maintenance: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Frequency</InputLabel>
            <Select
              value={formData.pay_frequency}
              onChange={(e) => setFormData({ ...formData, pay_frequency: e.target.value })}
              label="Payment Frequency"
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          {formData.pay_frequency !== "Daily" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Payment Day</InputLabel>
              <Select
                value={formData.pay_day}
                onChange={(e) => setFormData({ ...formData, pay_day: e.target.value })}
                label="Payment Day"
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Icon Class (optional)"
            value={formData.icon_class}
            onChange={(e) => setFormData({ ...formData, icon_class: e.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              minDate={dayjs().startOf("day")}
            />
            <br />
            <br />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              minDate={startDate.add(1, "day")}
            />
          </LocalizationProvider>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="create_property_form" variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePropertyDialogue;
