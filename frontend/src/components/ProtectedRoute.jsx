import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

const ProtectedRoute = ({ route, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading state

  console.log(route ? 
    `Protected route ${route} accessed...` :
    "Unspecified protected route accessed..."
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/users/profile");

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show a loading state while authentication is being verified
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
