import React, { useContext } from "react";

import { Link, useLocation } from "react-router";

import { AuthContext } from "../AuthContext";

import StudentView from "../components/StudentView";
import ClassroomHeader from "../components/ClassroomHeader";
import ClassroomFooter from "../components/ClassroomFooter";
import TeacherView from "../components/TeacherView";

// import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Classroom = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const classroom = location.state?.classroom;

  if (!classroom)
    return (
      <Box sx={{ padding: 3 }}>
        <Typography>
          No classroom data found. Please return to the dashboard and try again.
        </Typography>
        <Link to="/dashboard">Go Back</Link>
      </Box>
    );

  return (
    <Box sx={{ padding: 3 }}>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid size="grow">
          <ClassroomHeader class_name={classroom.class_name || "Loading..."} />
          {user.id === classroom.fk_teacher_id ? (
            <TeacherView classroom={classroom} />
          ) : (
            <StudentView classroom={classroom} />
          )}
        </Grid>
      </Grid>
      <Grid size="auto"></Grid>
      <ClassroomFooter class_code={classroom.class_code || "XXXXXXX"} />
    </Box>
  );
};

export default Classroom;
