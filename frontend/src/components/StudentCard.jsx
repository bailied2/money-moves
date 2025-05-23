import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

const StudentCard = ({ first_name, last_name, checking_balance, savings_balance, jobs = [], savings_enabled = true }) => {
  const theme = useTheme(); // Use the theme here
  return (
    <Card
      raised
      sx={{
        bgcolor:"#FA7921",
        margin: 2,
        position: "relative",
        minHeight: 185,
        maxWidth: 300,
       
        padding: 3,
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
          {first_name ? first_name + " " + (last_name ? last_name : "") : "Unnamed Student"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Checking Balance: ${checking_balance ? checking_balance : "00.00"}
        </Typography>
        {savings_enabled && (
          <Typography variant="body2" color="text.secondary">
            Savings Balance: ${savings_balance ? savings_balance : "00.00"}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {jobs.length > 0 ? (jobs.length > 1 ? "Jobs:" : `Job: ${jobs[0].title}`) : "Unemployed"}
        </Typography>
        {jobs.length > 1 && jobs.map((job, index) => (
          <Typography key={index} variant="body2" color="text.secondary" marginLeft={5}>
            {job.title}
          </Typography>
        ))}
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button 
          size="small" 
          variant="contained" 
          fullWidth 
          color="primary"
          sx={{ 
            borderColor: "black", 
            borderStyle: "solid", 
            borderWidth: "1px" 
          }}
        >
          Edit
        </Button>

        <Button 
          size="small" 
          color="error" 
          variant="contained" 
          fullWidth 
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

export default StudentCard;
