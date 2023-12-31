/* eslint-disable*/

import React from "react";
import "./Photos.css";
import Cards from "./Cards/PCards";

function Photos({ isPhotos }) {
  return (
    <ul className="photoCards">
      <Cards isPhotos={isPhotos} />
    </ul>
  );
}

export default Photos;
