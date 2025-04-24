import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import api from "../api";

const AddPropertyCard = ({ classroom_id, onSubmit }) => {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    rent: "",
    maintenance: "",
    pay_frequency: "Monthly",
    pay_day: "",
  });

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDecimalChange = (e) =>
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value)});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classroom_id) {
      alert("No classroom id provided. Cannot submit.");
      return;
    }

    try {
      const response = await api.post("/properties", {
        ...formData,
        classroom_id,
      });

      if (typeof onSubmit === "function") {
        onSubmit(response.data.property);
      }

      alert("Property added successfully!");
      setFormData({
        title: "",
        description: "",
        value: "",
        rent: "",
        maintenance: "",
        pay_frequency: "Monthly",
        pay_day: "",
      });
      handleClose();
    } catch (err) {
      console.error("Error adding property:", err);
    }
  };

  if (opened)
    return (
      <Card
        raised
        sx={{
          bgcolor: "#FA7921",
          maxWidth: 600,
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit} id="add_property_form">
            <Typography variant="h5">Add Property</Typography>
            <TextField
              size="small"
              variant="standard"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              size="small"
              variant="standard"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              size="small"
              variant="standard"
              label="Value"
              name="value"
              type="number"
              value={formData.value}
              onChange={handleDecimalChange}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              size="small"
              variant="standard"
              label="Rent"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleDecimalChange}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              size="small"
              variant="standard"
              label="Maintenance"
              name="maintenance"
              type="number"
              value={formData.maintenance}
              onChange={handleDecimalChange}
              fullWidth
              required
              margin="dense"
            />
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Pay Frequency</InputLabel>
              <Select
                name="pay_frequency"
                value={formData.pay_frequency}
                onChange={handleChange}
                label="Pay Frequency"
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              variant="standard"
              label="Pay Day"
              name="pay_day"
              value={formData.pay_day}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" type="submit" form="add_property_form">
            Submit
          </Button>
          <Button size="small" onClick={handleClose} color="error">
            Cancel
          </Button>
        </CardActions>
      </Card>
    );

  return (
    <Card
      sx={{
        boxShadow: 0,
        minHeight: 185,
        maxWidth: 600,
        padding: 1,
        border: "3px dashed lightgrey",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardActions
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          padding: 3,
        }}
      >
        <Typography variant="button" align="center">
          Add Property
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};

export default AddPropertyCard;
