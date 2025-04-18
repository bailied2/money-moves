import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import ClassCard from "./ClassCard";

import CreateClassroomDialog from "./CreateClassroomDialog";
import JoinClassroomDialog from "./JoinClassroomDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

import CircularProgress from "@mui/material/CircularProgress";

import { Stack, Typography, Paper } from "@mui/material";

import api from "../api";

const ClassroomList = ({ header = true, teacher = false }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get(
          `/classrooms/${teacher ? "teacher" : "student"}`
        );
        console.log(response);
        setClassrooms(response.data.classrooms);
        setError(null);
      } catch (err) {
        setError("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, [teacher]);

  const addClassroom = (classroom) => {
    if (classroom) setClassrooms(classrooms.concat(classroom));
  };

  const deleteClassroom = async (classroom_id) => {
    try {
      const response = await api.delete(`/classrooms/${classroom_id}`);
      console.log(response);
      setClassrooms(classrooms.filter((c) => c.id !== classroom_id));
      setAlertMessage("Classroom deleted successfully!");
    } catch (err) {
      alert("Error deleting classroom");
    }
  };

  return (
    <Stack
      component={Paper}
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
        marginBottom: 2,
        borderRadius: 5,
        boxShadow: 1,
        padding: 2,
      }}
    >
      {header && (
        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginLeft: "1em", padding: 1 }}
        >
          My Classrooms - {teacher ? "Teacher" : "Student"}
        </Typography>
      )}
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
          classrooms.map((classroom, index) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 3, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <ClassCard
                // title={classroom.class_name}
                // num_students={classroom.num_students}
                // // start_date={classroom.start_date}
                // // end_date={classroom.end_date}
                // start_date={dayjs(classroom.start_date).format("M/D/YYYY")}
                // end_date={dayjs(classroom.end_date).format("M/D/YYYY")}
                // id={classroom.id}
                classroom={classroom}
                onDelete={
                  teacher ? deleteClassroom.bind(null, classroom.id) : null
                }
              ></ClassCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >
          {!loading &&
            (teacher ? (
              <CreateClassroomDialog onSubmit={addClassroom} />
            ) : (
              <JoinClassroomDialog />
            ))}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ClassroomList;
