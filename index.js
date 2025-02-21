import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./pages/styles.css";

import CreateClassroom from "./pages/components/create_classroom";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CreateClassroom />
  </StrictMode>
);