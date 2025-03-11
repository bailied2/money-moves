import React, { useEffect, useState } from "react";
import api from "../api";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        setProfile(response.data.profile);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Only authorized users can see this content.</p>
      <p>
        User Profile: <br />
        {profile && (
          <div>
            <h1>Welcome, {profile.first_name}!</h1>
            <p>Email: {profile.email}</p>
            <p>User ID: {profile.id}</p>
          </div>
        )}
      </p>
    </div>
  );
};

export default Dashboard;
