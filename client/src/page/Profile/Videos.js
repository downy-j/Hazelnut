/* eslint-disable*/

import React from "react";
import Cards from "./Cards/VCards";

function Videos({ isVideos }) {
  return (
    <ul className="videoCards">
      <Cards isVideos={isVideos} />
    </ul>
  );
}

export default Videos;
