import "./styles/CardList.css";

import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import ClassCard from "./ClassCard";
import AddNewCard from "./AddNewCard";

import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";

import { AuthContext } from "../AuthContext";

import dayjs from "dayjs";
import api from "../api";

const ClassroomList = ({ header = true, teacher = false }) => {
  const { user } = useContext(AuthContext);

  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get(`/classrooms/${teacher ? "teacher" : "student"}/${user.id}`);
        console.log(response)
        setClassrooms(response.data.classrooms);
      } catch (err) {
        setError("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
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
          classrooms.map((classroom, index) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 3, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <ClassCard
                title={classroom.class_name}
                num_students={classroom.num_students}
                // start_date={classroom.start_date}
                // end_date={classroom.end_date}
                start_date={dayjs().format("D/M/YYYY")}
                end_date={dayjs().format("D/M/YYYY")}
              ></ClassCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >
          <AddNewCard />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ClassroomList;
