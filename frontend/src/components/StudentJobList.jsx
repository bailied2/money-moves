import React, { useState, useEffect } from "react";
import api from "../api"; // Import your API instance

const StudentJobList = ({ studentId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get(`/jobs/student-jobs/${studentId}`);
        setJobs(response.data.jobs || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs for student:", err);
        setError("Failed to fetch jobs for student.");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchJobs();
    }
  }, [studentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h3>Jobs Assigned to Student</h3>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> - {job.description}
              <br />
              <small>Wage: ${job.wage}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs assigned to this student.</p>
      )}
    </div>
  );
};

export default StudentJobList;
