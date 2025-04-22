import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <h1 className="text-center mt-4">Welcome to Money Moves Academy</h1>
//       <ClassroomList header="My Classrooms" subheader="Teacher" />
//       <StudentCard
//         first_name="John"
//         last_name="Doe"
//         jobs={[{ title: "Loan Officer" }]}
//       ></StudentCard>
//       <StudentCard first_name="Jane" last_name="Doe"></StudentCard>
//       <StudentCard
//         first_name="Devin"
//         last_name="Bailie"
//         jobs={[{ title: "Loan Officer" }, { title: "Teacher's Assistant" }]}
//       ></StudentCard>
//       <CreateClassroomForm></CreateClassroomForm>
//       {/* <CardList header="My Classrooms" subheader="Teacher" /> */}
//       <UserRegistrationForm />
//       <LoginForm />
//       {/* <ClassCard title="Class 1" description="A classroom" />
//       <CreateClassroom />
//       <br />
//       <AddStudent />
//       <br />
//       <AddProperty />
//       <br />
//       <AddJob />
//       <br />
//       <AddFeeBonus />
//       <br /> */}
//     </>
//   );
// };

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
