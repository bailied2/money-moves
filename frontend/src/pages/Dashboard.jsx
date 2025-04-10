import React, { useContext } from "react";

import ClassroomList from "../components/ClassroomList";

import CircularProgress from "@mui/material/CircularProgress";

import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <CircularProgress sx={{ margin: "1 auto" }} />;

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h1>Welcome, {user.first_name}!</h1>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      )}
      <ClassroomList teacher />
      <ClassroomList />
    </div>
  );
};

export default Dashboard;
