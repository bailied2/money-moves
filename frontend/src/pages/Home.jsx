import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarsImage from "../assets/homepagestars-15.svg";

const Home = () => (
  <Box 
    sx={{ 
      display: "flex", 
      padding: 0, 
      margin: 0, 
      height: "100vh", 
      overflow: "hidden" 
    }}
  >
   
    <Box sx={{ flex: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Unlock financial literacy with<br />Money Moves Academy!<br />
      </Typography>
      <Typography variant="body1">
        <br />To get started, click sign up or log in above.
      </Typography>
    </Box>

   
    <Box 
      sx={{ 
        flex: 1, 
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "flex-end", 
        padding: 0, 
        margin: 0 
      }}
    >
      <img 
        src={StarsImage} 
        alt="Decorative stars" 
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover", 
          display: "block" 
        }} 
      />
    </Box>
  </Box>
);

export default Home;
