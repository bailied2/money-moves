// import "./styles/CreateJobForm.css";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Container, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../api";


// for updates, fetch all the data for that specific job, 
// (get request to the backend to get a job by id), 
// then set the fields to the form data
//



const UpdatePropertyForm = ({ property_id = null }) => {

  const current_date = dayjs().startOf("day");

  console.log("Creating property form.");
 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    rent: "Weekly", 
    maintenance: "", 
    pay_frequency: "Weekly", 
    pay_day: "Monday",
    icon_class: "none"
  });
  const [startDate, setStartDate] = useState(current_date);
  const [endDate, setEndDate] = useState(current_date.add(6, "M"));
console.log(property_id);
  //fetching specific job
  useEffect(() => {
  const fetchProperty = async () => {
    try {
        const response = await api.get(`/properties/${property_id}`);
       // console.log("Got:", response.data)
        return setFormData(response.data.data);
      
      } catch (error) {
        console.error("Failed to fetch property:", error);
        return null;
      }
    };

    fetchProperty();
}, []);
  
  
  const handleStartDateChange = (value) => {
    setStartDate(dayjs(value));

      setFormData({
        ...formData,
        start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      });
  }






  const handleEndDateChange = (value) => {
    setEndDate(dayjs(value));
    setFormData({
      ...formData,
      end_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const handleSubmit = async (e) => {
    console.log("Attempting form submit");
    e.preventDefault();
    try {
        //debug
        console.log("Form data before submitting", formData);
       const response = await api.put(`/properties/${property_id}`, {formData});
    //   console.log(response.data);
      alert("Property updated successfully!");
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
        icon_class: "none",
       
      }); // Reset form data
    } catch (error) {
      console.error("Error creating job:", error);
    }
    
  };

  return (


    <Container maxWidth="sm">
          <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
            <Typography variant="h5" gutterBottom>
              Update Property
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, maintenance: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, pay_frequency: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, pay_day: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, icon_class: e.target.value })}
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
                Update Property
              </Button>
            </form>
          </Box>
        </Container>
      );
    };

export default UpdatePropertyForm;
