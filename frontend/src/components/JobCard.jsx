import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const JobCard = ({
  title,
  description,
  wage,
  pay_frequency,
  pay_day,
  icon_class,
  is_trustee, // Added this prop
  onEdit,
  onAssign,
  onDelete,
}) => {
  return (
    <Card
      raised
      sx={{
        bgcolor: "#FA7921",
        position: "relative",
     
        height: "auto", // Adjust as needed
        maxWidth: 300,
        width:"100%",
        padding: 3,
        margin:2,
        borderRadius: 2,
        
        flexDirection: "column",
    
        
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2px",
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description || "Job description goes here."}
        </Typography>
        <Typography variant="body2">Wage: ${wage || "0.00"}</Typography>

        <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
          <InputLabel>Pay Frequency</InputLabel>
          <Select value={pay_frequency || "Monthly"} label="Pay Frequency" disabled>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        {pay_day && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Pay Day: {pay_day}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 1 }}>
          Trustee Status: {is_trustee ? "Yes" : "No"}
        </Typography> {/* Display trustee status */}
      </CardContent>

      <CardActions 
       disableSpacing
      sx={{ padding: 0,
        display: "flex",
        flexDirection: "column", // stack vertically
        alignItems: "stretch",   // make buttons full width
        gap: 1,                  // spacing between buttons
        
        mt: 2,                   // spacing above the buttons
      }}>


        <Button
          size="small" 
          variant="contained" 
          fullWidth 
          color="primary"
          onClick={onEdit}
          sx={{ marginRight: 1 ,
          borderColor: "black", 
     borderStyle: "solid", 
    borderWidth: "1px" 
  }}
        >
          Edit
        </Button>

        <Button
          size="small" 
          variant="contained" 
          fullWidth 
          color="primary"
          onClick={onAssign}
          sx={{ marginRight: 1 ,
            borderColor: "black", 
            borderStyle: "solid", 
           borderWidth: "1px" 

          }}
        >
          Assign
        </Button>

        <Button
          size="small"
          color="error"
          variant="contained"
          fullWidth 
          onClick={onDelete}
          sx={{ 
            borderColor: "black", 
            borderStyle: "solid", 
            borderWidth: "1px" 
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
