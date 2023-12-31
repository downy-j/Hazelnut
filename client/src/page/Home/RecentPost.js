/* eslint-disable*/

import React from "react";
import { Link } from "react-router-dom";

function RecentPost() {
  return (
    <li>
      <Link to="#">
        <span>사진</span>
        <span>첫번째 게시글</span>
        <span>12.09</span>
      </Link>
    </li>
  );
}

export default RecentPost;
