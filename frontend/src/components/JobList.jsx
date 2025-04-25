import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import CreateJobDialog from "./CreateJobDialog"; // import CreateJobDialog instead of AddJobCard
import JobCard from "./JobCard";
import UpdateJobDialog from "./UpdateJobDialog";
import api from "../api";

const JobList = ({ classroomId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // state to manage dialog visibility

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

  const handleUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === updatedJob.id ? updatedJob : j))
    );
    setEditingJob(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: 5,
        boxShadow: 1,
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
                pay={job.pay}
                onEdit={() => setEditingJob(job)}
                onDelete={() => deleteJob(job.id)}
              />
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >
          <button onClick={handleDialogOpen}>Add Job</button>{" "}
          {/* Button to open the CreateJobDialog */}
        </Grid>
      </Grid>

      {/* Edit dialog */}
      {editingJob && (
        <UpdateJobDialog
          open={Boolean(editingJob)}
          onClose={() => setEditingJob(null)}
          jobData={editingJob}
          onUpdate={handleUpdate}
        />
      )}

      {/* Create Job Dialog */}
      <CreateJobDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onCreateJob={addJob} // Add the job when created
      />
    </Stack>
  );
};

export default JobList;
