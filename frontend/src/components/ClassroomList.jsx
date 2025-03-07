import "./styles/CardList.css";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import ClassCard from "./ClassCard";
import AddNewCard from "./AddNewCard";

import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";

import dayjs from "dayjs";
import axios from "axios";

const ClassroomList = ({ cardType, header, subheader }) => {
  const [classrooms, setClassrooms] = useState([]);

  const teacher_id = 6; // NEEDS TO BE MADE VARIABLE

  const getTeacherClassrooms = async (teacher_id) => {
    const response = await axios.get(`http://localhost:5001/api/classrooms/teacher/${teacher_id}`);
    return response.data;
  }

  getTeacherClassrooms(teacher_id).then((data) => {
    setClassrooms(Array.from(data));
  });


  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      {header && (
        <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
          {header}
          {subheader && " - " + subheader}
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
        {classrooms.map((classroom, index) => (
          <Grid
            key={index}
            size={{ xs: 2, sm: 3, md: 3 }}
            display="flex"
            justifyContent="center"
          >
            <ClassCard
              title={classroom.title}
              num_students={0}
              start_date={classroom.start_date}
              end_date={classroom.end_date}
              // start_date={dayjs().format("D/M/YYYY")}
              // end_date={dayjs().format("D/M/YYYY")}
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
