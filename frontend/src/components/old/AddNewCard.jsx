import React from "react";
import { Card, Typography, CardActions } from "@mui/material";

import CreateClassroomDialog from "../CreateClassroomDialog";

const AddNewCard = ({ label, onClassroomAdded }) => {
  const handleSubmit = (data) => {
    if (typeof onClassroomAdded === "function") onClassroomAdded(data);
  };

  return (
    <>
      <Card 
        sx={{
          boxShadow: 0,
          position: "relative",
          minHeight: 185,
          maxWidth: 300,
          aspectRatio: "3/2",
          padding: 1,
          border: "3px dashed #174C66",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            gap: 2,
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="button" align="center">
            {label && label}
          </Typography>
          <CreateClassroomDialog onSubmit={handleSubmit} />
        </CardActions>
      </Card>
    </>
  );
};

export default AddNewCard;
