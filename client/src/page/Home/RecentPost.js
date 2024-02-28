/* eslint-disable*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useSelector } from "react-redux";

function RecentPost() {
  // 최신글 불러오기
  const getPosts = useSelector((state) => state.recent);
  return (
    <ul>
      {getPosts.map((post, index) => (
        <li key={index}>
          <Link to="#">
            <span>사진</span>
            <span className="content">{post.content}</span>
            <span>{post.createdAt}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RecentPost;
