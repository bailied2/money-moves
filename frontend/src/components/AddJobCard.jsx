import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../api";

const AddJobCard = ({ classroom_id }) => {
  const current_date = dayjs().startOf("day");

  console.log("Creating job form.");

  const [formData, setFormData] = useState({
    title: "", // Changed from job_title
    description: "", // Changed from job_description
    wage: "",
    pay_frequency: "Weekly",
    pay_day: "", // Added pay_day
    icon_class: "",
    is_trustee: false,
  });

  const [opened, setOpened] = useState(false);

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const handleSubmit = async (e) => {
    console.log("Attempting form submit");
    e.preventDefault();
    try {
      //debug
      console.log("Form data before submitting", formData);
      const response = await api.post("/jobs", { formData, classroom_id: classroom_id });
      console.log(response.data);
      alert("Job added successfully!");
      setFormData({
        title: "", // Reset field names to match backend
        description: "", // Reset field names to match backend
        wage: "",
        pay_frequency: "Weekly",
        pay_day: "", // Reset pay_day
        icon_class: "",
        is_trustee: false,
      }); // Reset form data
      handleClose();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <Card
      raised
      sx={{
        maxWidth: 600,
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        boxShadow: 3,
        marginTop: 2,
      }}
    >
      {opened ? (
        <>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Create Job
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                margin="normal"
                id="title"
                name="title"
                value={formData.title}
                label="Job Title"
                variant="standard"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                fullWidth
              />
              <br />
              <TextField
                required
                margin="normal"
                id="description"
                name="description"
                value={formData.description}
                label="Job Description"
                variant="standard"
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                fullWidth
              />
              <br />
              <TextField
                required
                margin="normal"
                id="wage"
                name="wage"
                value={formData.wage}
                label="Wage"
                variant="standard"
                type="number"
                onChange={(e) => {
                  setFormData({ ...formData, wage: e.target.value });
                }}
                fullWidth
              />
              <br />
              <FormControl fullWidth margin="normal">
                <InputLabel>Pay Frequency</InputLabel>
                <Select
                  required
                  id="pay_frequency"
                  value={formData.pay_frequency}
                  onChange={(e) => {
                    setFormData({ ...formData, pay_frequency: e.target.value });
                  }}
                  label="Pay Frequency"
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              <br />
              {formData.pay_frequency !== "Daily" && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Pay Day</InputLabel>
                  <Select
                    id="pay_day"
                    value={formData.pay_day}
                    onChange={(e) => {
                      setFormData({ ...formData, pay_day: e.target.value });
                    }}
                    label="Pay Day"
                  >
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                  </Select>
                </FormControl>
              )}
              <br />
              <TextField
                required
                margin="normal"
                id="icon_class"
                name="icon_class"
                value={formData.icon_class}
                label="Icon Class"
                variant="standard"
                onChange={(e) => {
                  setFormData({ ...formData, icon_class: e.target.value });
                }}
                fullWidth
              />
              <br />
              <FormControl margin="normal">
                <InputLabel>Is Trustee</InputLabel>
                <Select
                  id="is_trustee"
                  value={formData.is_trustee}
                  onChange={(e) => {
                    setFormData({ ...formData, is_trustee: e.target.value });
                  }}
                  label="Is Trustee"
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </CardActions>
        </>
      ) : (
        <CardActions
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            padding: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="button" align="center">
            Add Job
          </Typography>
          <Fab color="primary" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </CardActions>
      )}
    </Card>
  );
};

export default AddJobCard;
