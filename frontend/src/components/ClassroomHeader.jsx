import React from "react";

import { Link as RouterLink } from "react-router";

import { Stack, Typography, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ClassroomHeader = ({ class_name }) => {
  return (
    <Stack direction="row" sx={{ padding: 1 }}>
      <Button
        component={RouterLink}
        to="/dashboard"
        sx={{ textTransform: "none", paddingRight: 3 }}
      >
        <ChevronLeftIcon />
        <Typography>Classes</Typography>
      </Button>
      <Typography
        variant="h4"
        align="center"
        sx={{ display: "absolute", margin: "auto" }}
      >
        {class_name}
      </Typography>
    </Stack>
  );
};

export default ClassroomHeader;
