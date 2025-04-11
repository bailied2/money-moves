import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthContext";

import PropertyList from "../components/PropertyList";
import CreateJobForm from "../components/CreateJobForm";





import Tab from '@mui/material/Tab';
import CreatePropertyForm from "./CreatePropertyForm";
import { Box, CircularProgress, Typography, Stack, Button } from "@mui/material";

import PropertyCard from "../components/PropertyCard"; // Import PropertyCard
import UpdatePropertyForm from "../components/UpdatePropertyForm"; // Import UpdatePropertyForm
import UpdateJobForm from "../components/UpdateJobForm"; // Import UpdatePropertyForm

import api from "../api"; // Assuming you have an API setup to fetch properties

import { grey } from "@mui/material/colors";

import StudentList from "../components/StudentList";
import InvestmentAccountList from "./InvestmentAccountList";
import YearEnds from "./YearEnds";

import Grid from "@mui/material/Grid2";


import Tabs from '@mui/material/Tabs';


const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TeacherView = ({ classroom }) => {
  const { user, user_loading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [viewMode, setViewMode] = useState("list");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (user_loading) return <p>Loading...</p>;

  // Students - Fees/Bonuses - Jobs - Properties - Investment Accounts - Year Ends - Settings
  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Students" {...a11yProps(0)} />
          <Tab label="Fees/Bonuses" {...a11yProps(1)} />
          <Tab label="Jobs" {...a11yProps(2)} />
          <Tab label="Properties" {...a11yProps(3)} />
          <Tab label="Investment Accounts" {...a11yProps(4)} />
          <Tab label="Year Ends" {...a11yProps(5)} />
          <Tab label="Settings" {...a11yProps(6)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <StudentList classroom={classroom} />
      </CustomTabPanel>


      <CustomTabPanel value={value} index={1}>
        Fees/Bonuses
      </CustomTabPanel>


      <CustomTabPanel value={value} index={2}>
        {/* Jobs tab- Display Create Jobs Form*/}
        <CreateJobForm  
        classroom_id = {classroom.id} >
        </CreateJobForm>

        {/* Jobs tab- Display Update Jobs Form*/}
        <UpdateJobForm
        job_id = {2}>
        </UpdateJobForm>


      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {/* <PropertyList classroom={classroom} />  */}
         <CreatePropertyForm classroom_id={classroom.id}></CreatePropertyForm>
      </CustomTabPanel>


      <CustomTabPanel value={value} index={4}>
        Investment Accounts
      </CustomTabPanel>


      <CustomTabPanel value={value} index={5}>
        Year Ends
      </CustomTabPanel>


          {/* Buttons to Switch View Modes */}
          <Box sx={{ marginTop: 2 }}>
            <Button onClick={() => setViewMode("list")}>View Properties</Button>
            <Button onClick={() => setViewMode("create")}>Create Property</Button>
            <Button onClick={() => setViewMode("update")}>Update Property</Button>
          </Box>
        
      
  
      <CustomTabPanel value={value} index={0}>
        <StudentList classroom={classroom} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Fees/Bonuses
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Jobs
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Properties
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <InvestmentAccountList classroom_id={classroom.id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <YearEnds classroom_id={classroom.id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Settings
      </CustomTabPanel>
    </Box>
  );
};

export default TeacherView;
