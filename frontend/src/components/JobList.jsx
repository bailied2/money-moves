import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AddJobCard from "./AddJobCard";
import JobCard from "./JobCard";
import UpdateJobDialog from "./UpdateJobDialog";
import AssignJobDialog from "./AssignJobDialog";
import api from "../api";

const JobList = ({ classroomId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

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

    if (classroomId) {
      fetchJobs();
    }
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

  const handleAssignJob = (jobId) => {
    setSelectedJobId(jobId);
    setOpenAssignDialog(true);
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
          <Grid xs={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          jobs.map((job) => (
            <Grid
              key={job.id}
              xs={2}
              sm={3}
              md={3}
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
                classroomId={classroomId}
                onEdit={() => setEditingJob(job)}
                onDelete={() => deleteJob(job.id)}
                onAssign={() => handleAssignJob(job.id)}
              />
            </Grid>
          ))}
        {/* Add Job Card at the end */}
        <Grid xs={2} sm={3} md={3} display="flex" justifyContent="center">
          <AddJobCard classroom_id={classroomId} onSubmit={addJob} />
        </Grid>
      </Grid>

      {/* Edit Job Dialog */}
      {editingJob && (
        <UpdateJobDialog
          open={Boolean(editingJob)}
          onClose={() => setEditingJob(null)}
          jobData={editingJob}
          onUpdate={handleUpdate}
        />
      )}

      {/* Assign Job Dialog */}
      <AssignJobDialog
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
        classroomId={classroomId}
        jobId={selectedJobId}
        onAssignStudents={(studentIds, jobId) => {
          console.log(`Assigned students [${studentIds.join(", ")}] to job ID: ${jobId}`);
          setOpenAssignDialog(false); // Close the dialog
        }}
      />
    </Stack>
  );
};

export default JobList;
