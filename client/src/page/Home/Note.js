/* eslint-disable*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Note({ currentItems }) {
  return (
    <ul>
      {currentItems.map((note, index) => (
        <li key={index}>
          <img src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"} alt="" />
          <Link to="#">
            <span>{note.userNick}</span>
            <span className="content">{note.content}</span>
            <span>{note.createdAt}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Note;
