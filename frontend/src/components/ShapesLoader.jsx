import "./styles/ShapesLoader.css";

import React from "react";

import SvgIcon from "@mui/material/SvgIcon";

// import { IconShapes } from "./IconShapes";
import { ReactComponent as LoaderIcon } from "../assets/shapesLoader.svg";

const ShapesLoader = ({ ...props }) => {
  return (
    <SvgIcon className="shapesLoader" {...props}>
      <LoaderIcon />
    </SvgIcon>
  );
};

export default ShapesLoader;
