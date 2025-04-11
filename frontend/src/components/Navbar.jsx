import "./styles/Navbar.css";
import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Button, Link } from "@mui/material";

import AccountMenu from "./AccountMenu";

import { AuthContext } from "../AuthContext";

import { grey } from "@mui/material/colors";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
      <AppBar position="static" >
        <Toolbar id="nav_toolbar">
          <Link id="home" component={Button} underline="none" href="/">
            Money Moves Academy
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Link
            id="dashboard"
            className="dashboard"
            component={Button}
            variant="body2"
            underline="none"
            href="/dashboard"
            sx={{ marginRight: "10px" }}
          >
            Dashboard
          </Link>
          <Link
            id="about"
            component={Button}
            variant="body2"
            underline="none"
            href="/about"
            sx={{ marginRight: "10px" }}
          >
            About
          </Link>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <AccountMenu />
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
