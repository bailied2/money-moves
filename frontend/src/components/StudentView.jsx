import React, { useState } from "react";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";

import PropertyList from "./PropertyList";

import JobList from "./JobList.jsx";
import Tabs from "@mui/material/Tabs";

import StudentAccounts from "./StudentAccounts";
import StudentJobList from "./StudentJobList.jsx";

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
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StudentView = ({ classroom, is_trustee, }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Accounts - Jobs - Properties - Fees/Bonuses (if trustee)
  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Accounts" {...a11yProps(0)} />
          <Tab label="Jobs" {...a11yProps(1)} />
          <Tab label="Properties" {...a11yProps(2)} />
          {is_trustee && <Tab label="Properties" {...a11yProps(3)} />}
        </Tabs>
      </Box>

      {/* Accounts Tab */}
      <CustomTabPanel id="accounts_tab_panel" value={value} index={0}>
        <StudentAccounts classroom_id={classroom.id} />
      </CustomTabPanel>

      {/* Jobs Tab */}
      <CustomTabPanel id="jobs_tab_panel" value={value} index={1}>
        {/* Jobs tab- Display Create Jobs Form*/}
        {/* <CreateJobForm classroom_id={classroom.id} /> */}
        {/* <JobList classroomId={classroom.id} /> */}
        {/* <StudentJobList studentId= {student.id} ></StudentJobList> */}
        </CustomTabPanel>

      {/* Properties Tab */}
      <CustomTabPanel id="properties_tab_panel" value={value} index={2}>
        {/* <PropertyList classroom={classroom} />  */}
        {/* <CreatePropertyForm classroom_id={classroom.id} />
        <UpdatePropertyForm property_id={2} /> */}
        <PropertyList classroomId={classroom.id} />

        {/* Buttons to Switch View Modes */}
      </CustomTabPanel>

      {/* Fees/Bonuses Tab (if trustee) */}
      {is_trustee && (
        <CustomTabPanel id="fees_bonuses_tab_panel" value={value} index={4}>
          Fees / Bonuses
        </CustomTabPanel>
      )}
    </Box>
  );
};

export default StudentView;
