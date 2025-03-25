import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import StudentCard from "./StudentCard";
import AddStudentCard from "./AddStudentCard";

import { grey } from "@mui/material/colors";
import { Stack, Typography, Button } from "@mui/material";

import { ClassroomContext } from "../ClassroomContext";
import api from "../api";

const StudentList = ({ classroom, header = true }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/students/classroom/${classroom.id}`);
        console.log(response);
        setStudents(response.data.students);
        setError(null);
      } catch (err) {
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classroom]);

  const addStudent = (students) => {
    if (students) setStudents(students.concat(students));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <Stack direction="row" sx={{ marginLeft: "1em", padding: 1 }}>
        {header && <Typography variant="h5">Students</Typography>}
        <Button variant="contained" sx={{ marginLeft: "2em" }}>
          Transfer Funds
        </Button>
      </Stack>
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
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          students.map((student, index) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 4, md: 4 }}
              display="flex"
              justifyContent="center"
            >
              <StudentCard
                id={student.id}
                first_name={student.first_name}
                last_name={student.last_name}
                balance={0}
              ></StudentCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
          display="flex"
          justifyContent="center"
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AddStudentCard classroom={classroom} onSubmit={addStudent} />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default StudentList;
