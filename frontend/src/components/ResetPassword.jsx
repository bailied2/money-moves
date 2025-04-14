import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api"; // Assuming api.js is configured to make requests

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Token from URL
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await api.post("/users/reset-password", {
        token,
        password,
      });
      setMessage(response.data.message);
      navigate("/login"); // Redirect after successful password reset
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}
      >
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {message && (
          <Typography variant="body2" color="primary">
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
