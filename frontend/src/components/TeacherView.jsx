import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Stack, Button } from "@mui/material";

import PropertyCard from "../components/PropertyCard"; // Import PropertyCard
import CreatePropertyForm from "../components/CreatePropertyForm"; // Import CreatePropertyForm
import UpdatePropertyForm from "../components/UpdatePropertyForm"; // Import UpdatePropertyForm
import CreateJobForm from "../components/CreateJobForm"; // Import CreateJobForm
import api from "../api"; // Assuming you have an API setup to fetch properties

import { grey } from "@mui/material/colors";

import StudentList from "../components/StudentList";
import InvestmentAccountList from "./InvestmentAccountList";
import YearEnds from "./YearEnds";

import Grid from "@mui/material/Grid2";


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
  const [properties, setProperties] = useState([]);
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // To toggle between list, create, and update
  const [value, setValue] = useState(3); // Start with the "Properties" tab

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get(`/properties/properties/classroom/${classroom.id}`);
        setProperties(response.data.properties);
        setError(null);
      } catch (err) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await api.get(`/jobs/classroom/${classroom.id}`);
        setJobs(response.data.jobs); // Set jobs data
      } catch (err) {
        setError("Failed to fetch jobs");
      }
    };

    fetchProperties();
    fetchJobs(); // Fetch jobs data when the component mounts
  }, [classroom.id]);

  const deleteProperty = async (property_id) => {
    try {
      const response = await api.delete(`/properties/${property_id}`);
      setProperties(properties.filter((p) => p.id !== property_id));
    } catch (err) {
      alert("Error deleting property");
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab label="Students" />
          <Tab label="Fees/Bonuses" />
          <Tab label="Jobs" />
          <Tab label="Properties" />
          <Tab label="Investment Accounts" />
          <Tab label="Year Ends" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Jobs Tab Content */}
      {value === 2 && (
        <Stack sx={{ maxWidth: "100%", margin: "0 auto", padding: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Jobs
          </Typography>

          {viewMode === "list" && (
            <Grid
              container
              rowSpacing={3}
              columnSpacing={2}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{
                borderRadius: 5,
                boxShadow: 1,
                bgcolor: grey[300],
                alignItems: "flex-start",
                padding: 2,
              }}
            >
              {loading && (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <CircularProgress sx={{ margin: "auto" }} />
                </Grid>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!loading &&
                !error &&
                jobs.map((job) => (
                  <Grid
                    key={job.id}
                    item xs={2} sm={3} md={3}
                    display="flex"
                    justifyContent="center"
                  >
                    {/* Display Job Information */}
                    <div>
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography>{job.description}</Typography>
                      <Typography>{`Wage: $${job.wage}`}</Typography>
                    </div>
                  </Grid>
                ))}
            </Grid>
          )}

          {/* Show Create Job Form */}
          {viewMode === "create" && <CreateJobForm classroomId={classroom.id} />}

          {/* Show Update Job Form */}
          {/* Add your update job form here */}

          {/* Buttons to Switch View Modes */}
          <Box sx={{ marginTop: 2 }}>
            <Button onClick={() => setViewMode("list")}>View Jobs</Button>
            <Button onClick={() => setViewMode("create")}>Create Job</Button>
          </Box>
        </Stack>
      )}

      {/* Properties Tab Content */}
      {value === 3 && (
        <Stack sx={{ maxWidth: "100%", margin: "0 auto", padding: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Properties
          </Typography>

          {viewMode === "list" && (
            <Grid
              container
              rowSpacing={3}
              columnSpacing={2}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{
                borderRadius: 5,
                boxShadow: 1,
                bgcolor: grey[300],
                alignItems: "flex-start",
                padding: 2,
              }}
            >
              {loading && (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <CircularProgress sx={{ margin: "auto" }} />
                </Grid>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!loading &&
                !error &&
                properties.map((property) => (
                  <Grid
                    key={property.id}
                    item xs={2} sm={3} md={3}
                    display="flex"
                    justifyContent="center"
                  >
                    <PropertyCard
                      title={property.name}
                      description={property.description}
                      start_date={property.start_date}
                      end_date={property.end_date}
                      id={property.id}
                      onDelete={() => deleteProperty(property.id)}
                    />
                  </Grid>
                ))}
            </Grid>
          )}

          {/* Show Create Property Form */}
          {viewMode === "create" && <CreatePropertyForm fk_classroom_id={classroom.id} />}

          {/* Show Update Property Form */}
          {viewMode === "update" && <UpdatePropertyForm fk_classroom_id={classroom.id} />}

          {/* Buttons to Switch View Modes */}
          <Box sx={{ marginTop: 2 }}>
            <Button onClick={() => setViewMode("list")}>View Properties</Button>
            <Button onClick={() => setViewMode("create")}>Create Property</Button>
            <Button onClick={() => setViewMode("update")}>Update Property</Button>
          </Box>
        </Stack>
      )}
  
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
