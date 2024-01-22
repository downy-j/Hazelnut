/* eslint-disable*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function RecentPost() {
  const { isRecentPosts } = useContext(UserContext);

  return (
    <ul>
      {isRecentPosts.map((post, index) => (
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
