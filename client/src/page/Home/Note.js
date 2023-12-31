/* eslint-disable*/

import React from "react";
import { Link } from "react-router-dom";
function Note() {
  return (
    <li>
      <img src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"} alt="" />
      <Link to="#">
        <span>downy</span>
        <span>맞방 탐방 왔어여~</span>
        <span>12.09</span>
      </Link>
    </li>
  );
}

export default Note;
