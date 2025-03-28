import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router";

import { AuthContext } from "../AuthContext";

import api from "../api";

import StudentAccounts from "../components/StudentAccounts";
import StudentList from "../components/StudentList";
import ClassroomHeader from "../components/ClassroomHeader";
import ClassroomFooter from "../components/ClassroomFooter";

import TeacherView from "../components/TeacherView";

import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Classroom = () => {
  const { id } = useParams();
  const { user, user_loading } = useContext(AuthContext);
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await api.get(`/classrooms/${id}`);

        setClassroom(response.data.classroom);
      } catch (error) {
        console.error("Failed to fetch classroom:", error);
        setClassroom(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClassroom();
  }, [id]);
  // const { classroom, classroom_loading } = useContext(ClassroomContext);

  if (loading || user_loading) return <p>Loading...</p>;

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
          {user.id === classroom.fk_teacher_id ? (
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
