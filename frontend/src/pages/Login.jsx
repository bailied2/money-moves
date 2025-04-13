import React from "react";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import LoginForm from "../components/LoginForm";

const Login = () => {
  let navigate = useNavigate();

  return (
    <Box sx={{ padding: 3 }}>
      <LoginForm
        onSuccess={() => {
          navigate("/dashboard");
        }}
      />
    </Box>
  );
};

export default Login;
