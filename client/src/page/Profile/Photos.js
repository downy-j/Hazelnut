/* eslint-disable*/

import React, { useEffect, useState } from "react";
import "./Photos.css";
import Cards from "./Cards/PCards";
import { Link, useParams } from "react-router-dom";
import { SERVER_URL, getCookies, getRequest } from "../../utile/service";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, resetPosts_Photo } from "../../Store/PostSlice";

function Photos() {
  const dispatch = useDispatch();
  // 유저 ========================================================

  const user = useSelector((state) => state.user.nick);
  const [thisUser, setThisUser] = useState(null);
  const { userNick } = useParams();
  useEffect(() => {
    if (user === userNick) {
      // 로그인한사람과 파라메터가 같을때
      setThisUser(user);
    } else {
      //로그인 한사람과 파라메터가 다를때
      setThisUser(userNick);
    }
  }, [user, userNick]);
  // post GET ========================================================
  const [postItems, setPostItems] = useState(null);

  useEffect(() => {
    try {
      const accToken = getCookies("accessToken");
      dispatch(getAllPosts({ accToken, thisUser }));
    } catch (error) {
      console.error("비동기 작업 실패:", error);
    }

    return () => {
      dispatch(resetPosts_Photo());
    };
  }, [dispatch, thisUser]);

  // 게시글 전체 불러오기
  const allPosts = useSelector((state) => state.post);

  // useEffect(() => {
  //   const getAllPosts = async () => {
  //     const accToken = getCookies("accessToken");
  //     try {
  //       if (thisUser) {
  //         const response = await getRequest(
  //           `${SERVER_URL}/${thisUser}/posts`,
  //           accToken
  //         );
  //         console.log("response >> ", response);

  //         if (response.error) {
  //           console.error("전체 게시물 응답에 실패:", response.error);
  //         }

  //         setPostItems(response);
  //       }
  //     } catch (error) {
  //       console.error("요청에 실패했습니다:", error);
  //     }
  //   };
  //   getAllPosts();
  // }, []);

  return (
    <ul className="photoCards">
      {allPosts.map((post, index) => (
        <li key={index} className="Card">
          <Link to={`/${thisUser}/photos/${post.id}`}>
            <img src={post.img} alt="" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Photos;
