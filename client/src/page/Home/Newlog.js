/* eslint-disable*/

import React from "react";
import { Link } from "react-router-dom";

function Newlog() {
  return (
    <ul>
      <li>
        <img src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"} alt="" />
        <Link to="#">
          <span>downy</span>
          <span>님이 게시글을 좋아합니다</span>
          <span>12.09</span>
        </Link>
      </li>
    </ul>
  );
}

export default Newlog;
