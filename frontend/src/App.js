import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import UserRegistrationForm from "./components/UserRegistrationForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Logout from "./pages/Logout";

// import logo from "./logo.svg";
import "./App.css";

import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute route="/dashboard">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom/:id"
          element={
            <ProtectedRoute route="/classroom/:id">
              <Classroom />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<UserRegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Testing page, should be removed in production */}
        <Route
          path="/test"
          element={
            <ProtectedRoute route="/test">
              <Test />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} /> {/* 404 Route */}
      </Routes>
    </Router>
  );
}

export default App;
