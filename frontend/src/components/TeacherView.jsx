import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthContext";

import StudentList from "../components/StudentList";

import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Box from '@mui/material/Box'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (user_loading) return <p>Loading...</p>;

  // Students - Fees/Bonuses - Jobs - Properties - Investment Accounts - Year Ends - Settings
  return (
    <Box sx={{width: "80%", margin: "auto"}}>
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
        Jobs
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Properties
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Investment Accounts
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Year Ends
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Settings
      </CustomTabPanel>
    </Box>
  );
};

export default TeacherView;

