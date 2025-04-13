import React from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const Test = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      Testing Page
    </Typography>
    <Divider />
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5" gutterBottom>
        Text
      </Typography>
      <Stack direction="row" gap={2}>
        <Button variant="text">Default</Button>
        <Button variant="text" color="primary">
          Primary
        </Button>
        <Button variant="text" color="secondary">
          Secondary
        </Button>
        <Button variant="text" disabled>
          Disabled
        </Button>
        <Button variant="text" href="#">
          Link
        </Button>
      </Stack>
    </Box>
    <Divider />
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5" gutterBottom>
        Outlined
      </Typography>
      <Stack direction="row" gap={2}>
        <Button variant="outlined">Default</Button>
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="outlined" href="#">
          Link
        </Button>
      </Stack>
    </Box>
    <Divider />
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5" gutterBottom>
        Contained
      </Typography>
      <Stack direction="row" gap={2}>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" href="#">
          Link
        </Button>
      </Stack>
    </Box>
    <Divider />
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5" gutterBottom>
        Buttons with icons and label
      </Typography>
      <Stack direction="row" gap={2}>
        <Button startIcon={<DeleteIcon />} variant="contained">
          Default
        </Button>
        <Button startIcon={<DeleteIcon />} variant="contained" color="primary">
          Primary
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary"
        >
          Secondary
        </Button>
        <Button startIcon={<DeleteIcon />} variant="contained" disabled>
          Disabled
        </Button>
        <Button startIcon={<DeleteIcon />} variant="contained" href="#">
          Link
        </Button>
      </Stack>
    </Box>
    <Divider />
  </Box>
);

export default Test;
