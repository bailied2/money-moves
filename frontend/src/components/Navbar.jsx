import "./styles/Navbar.css";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Link } from "@mui/material";

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
          <IconShapes style={{ width: 32, height: 32, marginRight: 8 }} />

          <Link
            id="home"
            component={Button}
            underline="none"
            href="/"
            sx={{ color: "#EADCD7", textTransform: "none" }}
          >
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
            sx={{
              marginRight: "10px",
              color: "#EADCD7",
              textTransform: "none",
            }}
          >
            Dashboard
          </Link>
          <Link
            id="about"
            component={Button}
            variant="body2"
            underline="none"
            href="/about"
            sx={{
              marginRight: "10px",
              color: "#EADCD7",
              textTransform: "none",
            }}
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
                sx={{
                  marginRight: "10px",
                  color: "#EADCD7",
                  textTransform: "none",
                }}
              >
                Login
              </Link>
              <Button
                component={Link}
                variant="contained"
                href="/register"
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
