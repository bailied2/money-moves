import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import api from "../api";

const AddInvestmentCard = ({ classroom_id, onSubmit }) => {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    initial_value: "",
  });

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDecimalChange = (e) => {
    const isValidDecimal = /^\d+(\.\d{1,2})?$/.test(e.target.value);
    if (isValidDecimal)
      setFormData({
        ...formData,
        [e.target.name]: parseFloat(e.target.value) || "",
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classroom_id) {
      alert("No classroom_id prop! Cannot submit form.");
    } else {
      try {
        const response = await api.post("/investment-accounts", {
          ...formData,
          classroom_id: classroom_id,
        });
        if (typeof onSubmit === "function") {
          onSubmit(response.data.investment_account);
        }
        alert("Investment account added successfully!");
        setFormData({
          title: "",
          description: "",
          initial_value: "",
        }); // Reset form data
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (opened)
    return (
      <Card
        raised
        sx={{
          position: "relative",
          overflow: "visible",
          maxWidth: 300,
          aspectRatio: "3/2",
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit} id="add_investment_account_form">
            <Typography variant="h5">Add Investment Account</Typography>
            <TextField
              size="small"
              variant="standard"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
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
              required
            />
            <TextField
              size="small"
              variant="standard"
              type="number"
              label="Initial Value"
              name="initial_value"
              value={formData.initial_value}
              onChange={handleDecimalChange}
              fullWidth
              margin="dense"
              required
              slotProps={{
                input: {
                  step: "0.01",
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
            />
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" type="submit" form="add_investment_account_form">
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
          Add Investment Account
        </Typography>
        <Fab onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};

export default AddInvestmentCard;
