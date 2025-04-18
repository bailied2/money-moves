import React from "react";

import { Link as RouterLink } from "react-router";

import { Stack, Typography, Button, Paper } from "@mui/material";
import "./styles/ClassroomFooter.css";

const ClassroomFooter = ({ class_code }) => {
  return (
    <Stack
      direction="row"
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "baseline",
        justifyContent: "space-around",
        padding: 2,

        // flexBasis: "",
      }}
    >
      <Button component={RouterLink} to="/" sx={{ textTransform: "none" }}>
        <Typography variant="h6">Money Moves Academy</Typography>
      </Button>
      <Typography variant="h6">
        Class Code:{" "}
        <Paper sx={{ display: "inline-block", padding: 1 }}>{class_code}</Paper>
      </Typography>
    </Stack>
  );
};

export default ClassroomFooter;
