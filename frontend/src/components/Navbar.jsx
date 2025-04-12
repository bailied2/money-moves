import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { ReactComponent as NavSeparator } from "../assets/thinlinecolor.svg";

import AccountMenu from "./AccountMenu";

import { AuthContext } from "../AuthContext";

import { IconShapes } from "./IconShapes";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#08415C" }}>
        <Toolbar id="nav_toolbar" sx={{ color: "#EADCD7" }}>
          <Button
            id="home"
            component={RouterLink}
            startIcon={
              <IconShapes style={{ width: 32, height: 32, marginRight: 8 }} />
            }
            to="/"
            sx={{
              color: "#EADCD7",
              fontSize: "1.43rem",
              textTransform: "none",
              textDecoration: "none",
            }}
          >
            Money Moves Academy
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Button
            id="dashboard"
            className="dashboard"
            component={RouterLink}
            to="/dashboard"
            sx={{
              marginRight: "10px",
              color: "#EADCD7",
              textTransform: "none",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Button>
          <Button
            id="about"
            component={RouterLink}
            to="/about"
            sx={{
              marginRight: "10px",
              color: "#EADCD7",
              textTransform: "none",
              textDecoration: "none",
            }}
          >
            About
          </Button>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <AccountMenu />
          ) : (
            <>
              <Button
                id="login"
                component={RouterLink}
                to="/login"
                sx={{
                  marginRight: "10px",
                  color: "#EADCD7",
                  textTransform: "none",
                  textDecoration: "none",
                }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                variant="contained"
                to="/register"
                sx={{
                  color: "#EADCD7",
                  backgroundColor: "#E55934",
                  "&:hover": { backgroundColor: "#cc472a" },
                  textTransform: "none",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
        <NavSeparator style={{ width: "100%", display: "block" }} />
      </AppBar>
    </Box>
  );
};

export default Navbar;
