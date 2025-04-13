import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Link as RouterLink } from "react-router-dom";

const Logout = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      Logout
    </Typography>
    <Typography>You have been successfully logged out!</Typography>
    <Button
      variant="outlined"
      color="primary"
      component={RouterLink}
      to="/login"
      sx={{ marginTop: 2 }}
    >
      Return to Login
    </Button>
  </Box>
);

export default Logout;
