import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import ClassCard from "./ClassCard";
import AddNewCard from "./AddNewCard";
import CreateClassroomDialog from "./CreateClassroomDialog";
import JoinClassroomDialog from "./JoinClassroomDialog";

import CircularProgress from "@mui/material/CircularProgress";

import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";

import dayjs from "dayjs";
import api from "../api";

const ClassroomList = ({ header = true, teacher = false }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (err) {
      alert("Error deleting classroom");
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
        marginBottom: 2,
        borderRadius: 5,
        boxShadow: 1,
        bgcolor: "#174C66",
        padding: 2,
      }}
    >
      {header && (
        <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
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
                onDelete={deleteClassroom.bind(null, classroom.id)}
              ></ClassCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >
          {/* {<AddNewCard
            label="Create New Classroom"
            onClassroomAdded={addClassroom}
          />} */}
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
