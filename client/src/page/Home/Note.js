/* eslint-disable*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Note() {
  const { isNotes } = useContext(UserContext);
  console.log(`isNotes >> ${JSON.stringify(isNotes)}`);

  return (
    <ul>
      {isNotes.map((note, index) => (
        <li key={index}>
          <img src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"} alt="" />
          <Link to="#">
            <span>downy</span>
            <span>내용내용내용</span>
            <span>12.09</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Note;
