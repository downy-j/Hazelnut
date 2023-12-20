import React from "react";
import Cards from "./Cards/PCards";

function Saved({ isPhotos, isVideos }) {
  return (
    <ul className="savedCards">
      <Cards isPhotos={isPhotos} isVideos={isVideos} />
    </ul>
  );
}

export default Saved;
