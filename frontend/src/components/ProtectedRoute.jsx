import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const admins = [1, 2, 3, 4, 5, 6];

const ProtectedRoute = ({ route, children }) => {
  const { user, loading } = useContext(AuthContext);

  // console.log(
  //   route
  //     ? `Protected route ${route} accessed...`
  //     : "Unspecified protected route accessed..."
  // );

  if (loading) return <CircularProgress sx={{ margin: "1rem auto" }} />;

  if (route === "/test" && user && !admins.includes(user.id)) {
    return <Navigate to="/dashboard" />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
