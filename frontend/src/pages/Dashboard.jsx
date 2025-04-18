import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ClassroomList from "../components/ClassroomList";

import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

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
