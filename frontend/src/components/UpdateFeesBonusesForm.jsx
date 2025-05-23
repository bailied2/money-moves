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



const UpdateFeesBonusesForm = ({feesbonuses_id }) => {

  const current_date = dayjs().startOf("day");

  console.log("Creating feebonus form.");
 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    icon_class: ""
  });
  // const [startDate, setStartDate] = useState(current_date);
  // const [endDate, setEndDate] = useState(current_date.add(6, "M"));
  //fetching specific job
  useEffect(() => {
  const fetchFeesBonuses = async () => {
    try {
        const response = await api.get(`/fees-bonuses/${feesbonuses_id}`);
       // console.log("Got:", response.data)
        return setFormData(response.data.data);
      
      } catch (error) {
        console.error("Failed to fetch fee/bonus:", error);
        return null;
      }
    };

    fetchFeesBonuses();
}, [feesbonuses_id]);
  
  
  // const handleStartDateChange = (value) => {
  //   setStartDate(dayjs(value));

  //     setFormData({
  //       ...formData,
  //       start_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
  //     });
  // }






  // const handleEndDateChange = (value) => {
  //   setEndDate(dayjs(value));
  //   setFormData({
  //     ...formData,
  //     end_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
  //   });
  // };

  const handleSubmit = async (e) => {
    console.log("Attempting form submit");
    e.preventDefault();
    try {
        //debug
        console.log("Form data before submitting", formData);
       const response = await api.put(`/fees-bonuses/${feesbonuses_id}`, {formData});
    //   console.log(response.data);
      alert("fee/bonus updated successfully!");
      // setStartDate(current_date); 
      // setEndDate(current_date.add(6, "M")); 
      setFormData({
        title: "",
        description: "",
        amount: "",
        icon_class: "",
       
      }); // Reset form data
    } catch (error) {
      console.error("Error updating fee/bonus:", error);
    }
    
  };

  return (


    <Container maxWidth="sm">
          <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#174C66" }}>
            <Typography variant="h5" gutterBottom>
              Update Fees and Bonuses
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* FeesBonuses Title */}
              <TextField
                required
                margin="normal"
                id="title"
                name="title"
                value={formData.title}
                label="feesbonuses Title"
                variant="standard"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value })}
                }
                  fullWidth

              />
              <br />
              <br />
    
              {/* Fee/Bonus Description */}
              <TextField
                required
                margin="normal"
                id="description"
                name="description"
                value={formData.description}
                label="FeesBonuses Description"
                variant="standard"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
              />
              <br />
              <br />
    
              {/* FeeBonus Amount */}
              <TextField
                required
                margin="normal"
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                label="FeeBonus Amount"
                variant="standard"
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                fullWidth
              />
              <br />
              <br />
    
              {/* Icon_class */}
              <TextField
                required
                margin="normal"
                id="icon_class"
                name="icon_class"
                type="text"
                value={formData.icon_class}
                label="Icon Class"
                variant="standard"
                onChange={(e) => setFormData({ ...formData, icon_class: e.target.value })}
                fullWidth
              />
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
                Update Fee/Bonus
              </Button>
            </form>
          </Box>
        </Container>
      );
    };

export default UpdateFeesBonusesForm;
