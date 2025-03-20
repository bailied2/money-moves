import React, { useContext, useEffect, useState } from "react";

import StudentAccounts from "../components/StudentAccounts";
import StudentList from "../components/StudentList";

import { AuthContext } from "../AuthContext";
import { ClassroomContext } from "../ClassroomContext";
import ClassroomHeader from "../components/ClassroomHeader";
import ClassroomFooter from "../components/ClassroomFooter";

import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Classroom = () => {
  const { user, user_loading } = useContext(AuthContext);
  const { classroom, classroom_loading } = useContext(ClassroomContext);

  if (user_loading) return <p>Loading...</p>;
  if (classroom_loading) return <p>Loading...</p>;

  const teacher = user.id === classroom.fk_teacher_id ? true : false;

  return (
    <div>
      <Grid container>
        <Grid size="grow">
          <Stack alignItems={"stretch"}>
            <ClassroomHeader class_name={classroom.class_name} />
            {!user_loading && !classroom_loading && teacher ? (
              <StudentList />
            ) : (
              <StudentAccounts />
            )}
          </Stack>
        </Grid>
      </Grid>
      <Grid size="auto"></Grid>
      <ClassroomFooter class_code={classroom.class_code} />
    </div>
  );
};

export default Classroom;
