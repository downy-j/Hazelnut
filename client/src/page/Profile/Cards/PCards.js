import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PCards.css";

function Cards({ isPhotos }) {
  const imgSrc =
    isPhotos && isPhotos.length > 0
      ? process.env.PUBLIC_URL + isPhotos[0].img
      : "";

  return (
    <li className="Card">
      <Link to="/:userId/photos/:postId">
        <img src={imgSrc} alt="" />
      </Link>
    </li>
  );
}

export default Cards;
