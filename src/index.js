import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import CreateClassroom from "./components/create_classroom";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CreateClassroom />
  </StrictMode>
);