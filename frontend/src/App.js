import React from "react";
import Navbar from "./components/Navbar";
import UserRegistrationForm from "./components/UserRegistrationForm";
import LoginForm from "./components/LoginForm";
import CardList from "./components/CardList";
import CreateClassroomForm from "./components/CreateClassroomForm";
import StudentCard from "./components/StudentCard";
// import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-center mt-4">Welcome to Money Moves Academy</h1>
      <StudentCard first_name="John" last_name="Doe" jobs={[{title: "alien"}]}></StudentCard>
      <CreateClassroomForm></CreateClassroomForm>
      <CardList header="My Classrooms" subheader="Teacher" />
      <UserRegistrationForm />
      <LoginForm />
      {/* <ClassCard title="Class 1" description="A classroom" />
      <CreateClassroom />
      <br />
      <AddStudent />
      <br />
      <AddProperty />
      <br />
      <AddJob />
      <br />
      <AddFeeBonus />
      <br /> */}
    </>
  );
};

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
