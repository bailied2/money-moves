import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ClassroomList from "../components/ClassroomList";

import CircularProgress from "@mui/material/CircularProgress";

import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <CircularProgress sx={{ margin: "1 auto" }} />;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {user && (
        <Typography variant="h6" gutterBottom>
          Welcome, {user.first_name}!
        </Typography>
      )}
      <ClassroomList teacher />
      <ClassroomList />
    </Box>
  );
};

export default Dashboard;
