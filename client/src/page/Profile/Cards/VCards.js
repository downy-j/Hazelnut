/* eslint-disable*/

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PCards.css";

function Cards({ isVideos }) {
  const videoSrc =
    isVideos && isVideos.length > 0
      ? process.env.PUBLIC_URL + isVideos[0].videos
      : "";

  return (
    <li className="Card">
      <Link to="/:userId/photos/:postId">
        <video width="320" height="240" controls>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </Link>
    </li>
  );
}

export default Cards;
