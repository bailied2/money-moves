import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ClassCard = ({ title, start_date, end_date, num_students }) => {
  return (
    <Card
      raised
      sx={{
        position: "relative",
        minHeight: 185,
        maxWidth: 300,
        aspectRatio: "3/2",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {num_students ? num_students : "No"} Student{num_students !== 1 && "s"}
        </Typography>
        <br />
        <Typography noWrap variant="body2" color="text.secondary">
          Start Date: {start_date}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          End Date: {end_date}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button size="small">Open</Button>
        <Button size="small" color="error">
          Delete
        </Button>{" "}
      </CardActions>
    </Card>
  );
};

export default ClassCard;
