// import "./styles/Navbar.css";
import React from "react";
import { AppBar, Box, Toolbar, Button, Link } from "@mui/material";

import { grey /*, purple */ } from "@mui/material/colors";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: grey[300] }}>
        <Toolbar id="nav_toolbar">
          <Link id="home" component={Button} underline="none" href="/">
            Money Moves Academy
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Link
            id="story"
            component={Button}
            variant="body2"
            underline="none"
            href="/story"
          >
            The Story
          </Link>
          <Link
            id="help"
            component={Button}
            variant="body2"
            underline="none"
            href="/help"
          >
            Help
          </Link>
          <Link
            id="login"
            component={Button}
            variant="body2"
            underline="none"
            href="/login"
            sx={{ marginRight: "10px" }}
          >
            Login
          </Link>
          <Button component={Link} variant="contained" href="/register">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
