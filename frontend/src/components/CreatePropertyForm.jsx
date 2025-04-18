import "./styles/CreatePropertyForm.css";

import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../api";

const CreatePropertyForm = ({ classroom_id }) => {
  const current_date = dayjs().startOf("day");

  console.log("creating property form");

  const [formData, setFormData] = useState({
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

  const [startDate, setStartDate] = useState(current_date);
  const [endDate, setEndDate] = useState(current_date.add(6, "M"));

  const handleStartDateChange = (value) => {
    setStartDate(dayjs(value));
    setFormData({
      ...formData,
      start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    });
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
    try {
      // debugging
      console.log("Form Data before submit:", formData);

      //on submit, send post request to backend properties route
      const response = await api.post("/properties", {
        formData,
        classroom_id: classroom_id,
      });
      console.log(response.data);
      alert("Property created successfully!");
      setStartDate(current_date);
      setEndDate(current_date.add(6, "M"));
      setFormData({
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
      console.log("Form Data before submit:", formData);

      //   formData.fk_classroom_id = formData.currentClassroomId;
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Create Property
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Property Title */}
          <TextField
            required
            margin="normal"
            id="title"
            name="title"
            value={formData.title}
            label="Property Title"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            fullWidth
          />
          <br />
          <br />

          {/* Property Description */}
          <TextField
            required
            margin="normal"
            id="description"
            name="description"
            value={formData.description}
            label="Property Description"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
          />
          <br />
          <br />

          {/* Property Value */}
          <TextField
            required
            margin="normal"
            id="value"
            name="value"
            type="number"
            value={formData.value}
            label="Property Value"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            fullWidth
          />
          <br />
          <br />

          {/* Rent */}
          <TextField
            required
            margin="normal"
            id="rent"
            name="rent"
            type="number"
            value={formData.rent}
            label="Rent"
            variant="standard"
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            fullWidth
          />
          <br />
          <br />

          {/* Maintenance */}
          <TextField
            required
            margin="normal"
            id="maintenance"
            name="maintenance"
            type="number"
            value={formData.maintenance}
            label="Maintenance Cost"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, maintenance: e.target.value })
            }
            fullWidth
          />
          <br />
          <br />

          {/* Payment Frequency */}
          <FormControl fullWidth required margin="normal">
            <InputLabel>Payment Frequency</InputLabel>
            <Select
              name="pay_frequency"
              value={formData.pay_frequency}
              onChange={(e) =>
                setFormData({ ...formData, pay_frequency: e.target.value })
              }
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />

          {/* Payment Day */}
          {formData.pay_frequency !== "Daily" && (
            <FormControl fullWidth required margin="normal">
              <InputLabel>Payment Day</InputLabel>
              <Select
                name="pay_day"
                value={formData.pay_day}
                onChange={(e) =>
                  setFormData({ ...formData, pay_day: e.target.value })
                }
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
          <br />

          {/* Icon Class */}
          <TextField
            margin="normal"
            id="icon_class"
            name="icon_class"
            value={formData.icon_class}
            label="Icon Class (Optional)"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, icon_class: e.target.value })
            }
            fullWidth
          />
          <br />
          <br />

          {/* Date Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              minDate={dayjs().startOf("day")}
              disablePast
            />
            <br />
            <br />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              minDate={startDate.add(1, "day")}
              disablePast
            />
          </LocalizationProvider>
          <br />
          <br />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Property
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePropertyForm;
