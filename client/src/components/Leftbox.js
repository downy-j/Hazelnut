/* eslint-disable*/

import React, { useContext, useEffect } from "react";
import "./Leftbox.css";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

function Leftbox({ isCount }) {
  const {
    isTodays,
    isTotals,
    myProfilePreview,
    preViewBox,
    myProfileImage,
    myProfileImageURL,

    user,
    setThisUser,
    thisUser,
  } = useContext(UserContext);

  const { userNick } = useParams();

  useEffect(() => {
    if (user === userNick) {
      // 로그인한사람과 파라메터가 같을때
      setThisUser(user);
    } else {
      //로그인 한사람과 파라메터가 다를때
      setThisUser(userNick);
    }
  }, [thisUser]);

  return (
    <div className="leftBox">
      <div className="visit__count df_jcc_aic">
        <span>today : {isTodays}</span>
        <span>total : {isTotals}</span>
      </div>

      <div className="imgBox">
        <img
          className="df_jcc_aic"
          src={
            preViewBox === null
              ? myProfileImageURL === null
                ? process.env.PUBLIC_URL + "/img/main/besicImg.jpg"
                : myProfileImageURL
              : preViewBox
          }
          alt="Not Found Image"
        />
        {user && user === userNick && (
          <input
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            onChange={myProfilePreview}
          />
        )}
        {preViewBox && (
          <button onClick={myProfileImage} className="imgSubmitBtn">
            적용하기
          </button>
        )}
      </div>

      <span
        className="conversation__Text"
        style={{ border: "1px solid white" }}
      >
        conversation__Text
      </span>

      <div className="setting__buttons df_jcc_aic">
        <div className="menu__button">
          <i className="fa-solid fa-gear"></i>
        </div>
        <div className="menu__button">
          <i className="fa-regular fa-bell"></i>
          <div className="count">{isCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Leftbox;
