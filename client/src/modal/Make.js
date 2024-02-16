/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import "./Make.css";
import { PostContext } from "../context/PostContext";

function Make({ makeHandler }) {
  const {
    setPreViewPost,
    preViewPost,
    postImagePreviewHandler,
    setPostContent,
    uploadPost,
  } = useContext(PostContext);

  const reselectionHandler = () => {
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
            <button onClick={uploadPost}>보내기</button>
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
