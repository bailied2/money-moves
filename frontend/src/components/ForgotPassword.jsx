import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api"; // Assuming api.js is configured to make requests

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post("/users/forgot-password", { email });
      
      if (response.status === 200) {
        setMessage("Password reset email sent. Check your inbox.");
        setEmail("");
        setTimeout(() => navigate("/login"), 5000); // Redirect to login page after 5 seconds
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setError(error.response.data.error || "Failed to send reset email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2,bgcolor:"#174C66", }}>
        
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {message ? (
          <Typography variant="body2" color="primary">
            {message}
          </Typography>
        ) : (
          <Typography variant="caption" color="text.primary">
            Enter your email address below to reset your password:
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Stack direction="row" gap={2} sx={{ mt: 2 }}> 
            <Button type="submit" disabled={loading} variant="contained" color="primary">
              Send Reset Link
            </Button>
            <Button variant="outlined" component={RouterLink} to="/login">
              Back to Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
