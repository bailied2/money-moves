import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const InvestmentAccountCard = ({
  title,
  description,
  yearly_values
}) => {
  // Utility function for displaying current share value
  const getCurrentValue = () => {
    // If yearly_values is missing or not an array, no value can be found.
    if (!Array.isArray(yearly_values)) {
      console.log("WARNING: yearly_values prop missing or not an array");
      return null; // Return null
    }

    let current_value; // Variable to update in loop
    // Loop through each yearly value, ensuring the values are sorted by end_date:
    for (const year of yearly_values.sort((a, b) => a.end_date - b.end_date)) { 
      current_value = year.value; // Update current_value

      if (year.end_date > Date.now()) {
        // If the current year has not yet ended, we have found the current value.
        return current_value; // Return the current value, 
      }
    }
  }

  return (
    <Card
      raised
      sx={{
        position: "relative",
        overflow: "visible",
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
        <Typography variant="h5" gutterBottom component="div">
          {title}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
        <br />
        <Typography noWrap variant="body2" color="text.secondary">
          Share Value: ${getCurrentValue()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" color="error">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default InvestmentAccountCard;
