/* eslint-disable*/

import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Make.css";
import { PostContext } from "../context/PostContext";
import { SERVER_URL, getCookies, postRequest } from "../utile/service";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadPost } from "../Store/PostSlice";

function Make({ makeHandler }) {
  const dispatch = useDispatch();
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

  // post POST =======================================================
  const [preViewPost, setPreViewPost] = useState(null); // 미리보기 이미지
  const [isPostImage, setPostImage] = useState(null); // 사진담을 그릇
  const [postContent, setPostContent] = useState(null); // 작성한 글 담을 그릇
  // 업로드 전 사진파일 미리보기
  const postImagePreviewHandler = (e) => {
    const file = e.target.files[0];

    setPostImage(file); // 사진한장 담음,

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreViewPost(reader.result);
      };
    }
  };

  // Post POST ==============================================================================
  const uploadPostHandler = (e) => {
    e.preventDefault();
    const accToken = getCookies("accessToken");
    const formData = new FormData();
    formData.append("postImage", isPostImage);
    formData.append("content", postContent);

    if (accToken) {
      dispatch(uploadPost({ accToken, formData, thisUser }));
    }
  };

  const reselectionHandler = ({ setPostContent }) => {
    setPreViewPost(null);
  };

  return (
    <div className="makeBody">
      <div className="makeBox">
        <div className="makeTitle">
          {preViewPost === null ? null : (
            <button className="reselection" onClick={reselectionHandler}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          )}

          <h3>새 게시물 만들기</h3>
        </div>
        {preViewPost === null ? (
          <div className="makeContent">
            <img src={process.env.PUBLIC_URL + "/img/home/make.png"} alt="" />
            <div className="uploadBtn">
              <input onChange={(e) => postImagePreviewHandler(e)} type="file" />
              <span>컴퓨터에서 선택</span>
            </div>
          </div>
        ) : (
          <form className="makeContent">
            <div className="imgBox">
              <img src={preViewPost} />
            </div>
            <div className="textBox">
              <textarea
                onChange={(e) => {
                  setPostContent(e.target.value);
                }}
                className="textarea"
              ></textarea>
            </div>
            <button onClick={uploadPostHandler}>보내기</button>
          </form>
        )}

        <div onClick={makeHandler} className="closeBtn">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
}

export default Make;
