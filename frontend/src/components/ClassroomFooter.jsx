import React from "react";

import { NavLink } from "react-router";

import { Stack, Typography, Paper } from "@mui/material";

const ClassroomFooter = ({ class_code }) => {
  return (
    <Stack
      direction="row"
      sx={{
        //position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "baseline",
        justifyContent: "space-around",
        padding: 2,
        flexBasis: "",
      }}
    >
      <NavLink to="/">
        <Typography variant="h6">Money Moves Academy</Typography>
      </NavLink>
      <Typography variant="h5">
        Class Code:{" "}
        <Paper sx={{ display: "inline-block", padding: 1 }}>{class_code}</Paper>
      </Typography>
    </Stack>
  );
};

export default ClassroomFooter;
