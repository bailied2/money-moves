import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  // IconButton,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDelete from "./ConfirmDeleteDialog";

import dayjs from "dayjs";

import { Link as RouterLink } from "react-router-dom";

const ClassCard = ({ classroom, onDelete }) => {
  return (
    <Card
      raised
      sx={{
        position: "relative",
        // overflow: "hidden",
        width: "auto",
        minWidth: 250,
        // aspectRatio: "3/2",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {classroom.class_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {classroom.num_students ? classroom.num_students : "No"} Student
          {classroom.num_students !== 1 && "s"}
        </Typography>
        <br />
        <Typography noWrap variant="body2" color="text.secondary">
          Start Date: {dayjs(classroom.start_date).format("M/D/YYYY")}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          End Date: {dayjs(classroom.end_date).format("M/D/YYYY")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={RouterLink}
          to={`/classroom/${classroom.id}`}
          state={{ classroom }}
        >
          Open
        </Button>
        {typeof onDelete === "function" && (
          <ConfirmDelete
            onSubmit={onDelete}
            deleteTarget={{
              type: "classroom",
              name: classroom.class_name,
              id: classroom.id,
              path: "classrooms",
              key: classroom.class_code,
              keyName: "Class Code",
            }}
          />
        )}
      </CardActions>
    </Card>
  );
};
export default ClassCard;
