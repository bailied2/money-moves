import React from "react";
import Navbar from "./components/Navbar";
import CreateClassroom from "./components/CreateClassroom";
import AddStudent from "./components/AddStudent";
import AddProperty from "./components/AddProperty";
import AddJob from "./components/AddJob";
import AddFeeBonus from "./components/AddFeeBonus";
import ClassCard from "./components/ClassCard";
// import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-4">Welcome to Money Moves Academy</h1>
      <ClassCard title="Class 1" description="A classroom" />
      <CreateClassroom /><br />
      <AddStudent /><br />
      <AddProperty /><br />
      <AddJob /><br />
      <AddFeeBonus /><br />
    </div>
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
