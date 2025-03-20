import React from "react";

import { NavLink } from "react-router";

import { Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ClassroomHeader = ({ class_name }) => {
  return (
    <Stack direction="row" padding={1}>
      <NavLink to="/dashboard">
        <Stack direction="row" padding={1}>
          <ChevronLeftIcon />
          <Typography>Classes</Typography>
        </Stack>
      </NavLink>
      <Typography variant="h4" align="center" width="100%">
        {class_name}
      </Typography>
    </Stack>
  );
};

export default ClassroomHeader;
