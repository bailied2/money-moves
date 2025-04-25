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
        bgcolor:"#FA7921",
        position: "relative",
        // overflow: "hidden",
        width: "auto",
        minWidth: 250,
        // aspectRatio: "3/2",
        margin: 2,
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height:"auto",
       
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2px",
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
      <CardActions
       disableSpacing
       sx={{
         
        display: "flex",
         flexDirection: "column", // stack vertically
         alignItems: "stretch",   // make buttons full width
         gap: 1,                  // spacing between buttons
         
         mt: 2,                   // spacing above the buttons
       }} 
      >
        <Button
          size="small"
          variant="contained" 
          fullWidth 
          color="primary"
          component={RouterLink}
          to={`/classroom/${classroom.id}`}
          state={{ classroom }}
          sx={{
    
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: "1px",  // Match the border width of the card
            borderRadius: 2,     // Match the card's border radius
            padding: 1,          // Adjust padding if needed for button size consistency
            textTransform: "none", // Optional: Keep text lowercase/normal
           
            
           
            }
          }
        >
          Open
        </Button>

        <Button
  size="small"
  color="error"
  variant="contained"
  fullWidth
  sx={{
    
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px",  // Match the border width of the card
    borderRadius: 2,     // Match the card's border radius
    padding: 1,          // Adjust padding if needed for button size consistency
    textTransform: "none", // Optional: Keep text lowercase/normal
   
    
   
    }
  }
>
  Delete
</Button>
      </CardActions>
    </Card>
  );
};
export default ClassCard;
