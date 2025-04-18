import React, { createContext, useState, useEffect } from "react";
import api from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial loading state

  // ✅ Check if user is authenticated on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/profile"); // Checks cookie token
        setUser(response.data.user);
      } catch (error) {
        console.log(
          "No valid session:",
          error.response?.data?.error || error.message
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
