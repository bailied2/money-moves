import React, { useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router";

import { AuthContext } from "../AuthContext";

import StudentAccounts from "../components/StudentAccounts";
import ClassroomHeader from "../components/ClassroomHeader";
import ClassroomFooter from "../components/ClassroomFooter";
import TeacherView from "../components/TeacherView";

import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Classroom = () => {
  const location = useLocation();
  const { user, user_loading } = useContext(AuthContext);
  const classroom = location.state?.classroom;

  if (!classroom)
    return (
      <>
        <p>
          No classroom data found. Please return to the dashboard and try again.
        </p>
        <Link to="/dashboard">Go Back</Link>
      </>
    );

  if (user_loading)
    return (
      <Stack sx={{ width: "100%", alignItems: "center", marginTop: 3 }}>
        <CircularProgress />
      </Stack>
    );

  return (
    <div>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid size="grow">
          <ClassroomHeader class_name={classroom.class_name || "Loading..."} />
          {user?.id === classroom.fk_teacher_id ? (
            <TeacherView classroom={classroom} />
          ) : (
            <StudentAccounts classroom_id={classroom.id} />
          )}
        </Grid>
      </Grid>
      <Grid size="auto"></Grid>
      <ClassroomFooter class_code={classroom.class_code || "XXXXXXX"} />
    </div>
  );
};

export default Classroom;
