import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotFound = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      404 - Not Found
    </Typography>
    <Typography>Oops! The page you’re looking for doesn’t exist.</Typography>
  </Box>
);

export default NotFound;
