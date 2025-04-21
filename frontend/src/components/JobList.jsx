import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import JobCard from "./JobCard";
import CreateJobDialogue from "./CreateJobDialogue";
import api from "../api";

const JobList = ({ classroomId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get(`/jobs/classroom/${classroomId}`);
        setJobs(response.data.jobs || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [classroomId]);

  const addJob = (job) => {
    if (job) setJobs((prev) => [...prev, job]);
  };

  const deleteJob = async (jobId) => {
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch (err) {
      alert("Error deleting job");
    }
  };

  const updateJob = async (jobId) => {
    try {
      const response = await api.put(`/jobs/${jobId}`);
      setJobs((prev) => prev.map((job) => (job.id === jobId ? response.data.job : job)));
    } catch (err) {
      alert("Error updating job");
    }
  };

  const assignJob = (jobId) => {
    console.log("Assign clicked for job:", jobId);
  };

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: 5,
        boxShadow: 1,
        maxWidth: "80%",
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
        Classroom Jobs
      </Typography>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "flex-start",
        }}
      >
        {loading && (
          <Grid size={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          jobs.map((job) => (
            <Grid
              key={job.id}
              size={{ xs: 2, sm: 3, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <JobCard
                title={job.title}
                description={job.description}
                wage={job.wage}
                pay_frequency={job.pay_frequency}
                pay_day={job.pay_day}
                icon_class={job.icon_class}
                is_trustee={job.is_trustee}
                onEdit={() => updateJob(job.id)}
                onAssign={() => assignJob(job.id)}
                onDelete={() => deleteJob(job.id)}
              />
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
          sx={{ marginTop: "1em" }} // Adds margin to move the button down
        >
          {!loading && (
            <CreateJobDialogue
              classroomId={classroomId}
              onSubmit={addJob}
            />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default JobList;
