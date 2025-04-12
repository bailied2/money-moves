import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWorking(true);

    try {
      const response = await api.post("/users/login", formData);
      console.log(response.data);

      // alert("User logged in successfully!");
      navigate("/dashboard", { flushSync: true });
      return <Navigate to="/login" />;
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.error);
    } finally {
      setWorking(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#174C66" }}
      >
        <Typography variant="h5" gutterBottom>
          Log In
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
            Submit
          </Button>
          {working && (
            <Backdrop open={working} sx={{width:"100%"}}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </form>
        <Box sx={{ mt: 2 }}>
          <Link href="/forgot-password" variant="body2">
            Forgot your password?
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
