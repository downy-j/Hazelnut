/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import "./Make.css";
import { PostContext } from "../context/PostContext";

function Make({ makeHandler }) {
  const {
    selectedFile,
    imgSRC,
    fileHandler,

    posting,
    isPostError,
    isPostInfo,
    updatePostInfo,
    isPostLoading,
  } = useContext(PostContext);

  const handlerSubmit = () => {
    isPostLoading;
  };
  return (
    <div className="makeBody">
      <div className="makeBox">
        <div className="makeTitle">
          <h3>새 게시물 만들기</h3>
        </div>
        {selectedFile === null ? (
          <div className="makeContent">
            <img src={process.env.PUBLIC_URL + "/img/home/make.png"} alt="" />
            <div className="uploadBtn">
              <input onChange={(e) => fileHandler(e)} type="file" />
              <span>컴퓨터에서 선택</span>
            </div>
          </div>
        ) : (
          <form className="makeContent" onSubmit={posting}>
            <div className="imgBox">
              <img src={imgSRC} />
            </div>
            <div className="textBox">
              <textarea
                onChange={(e) => {
                  updatePostInfo({
                    ...isPostInfo,
                    content: e.target.value,
                    img: selectedFile,
                  });
                }}
                className="textarea"
              ></textarea>
            </div>
            <button onClick={handlerSubmit} type="submit">
              보내기
            </button>
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
