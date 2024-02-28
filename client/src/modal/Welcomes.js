/* eslint-disable*/

import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Welcomes.css";
import { UserContext } from "../context/UserContext";
import { SERVER_URL, getCookies, patchRequest } from "../utile/service";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  resetUserInfo,
  updateTextBox,
} from "../Store/UserInfoSlice";
import { useParams } from "react-router-dom";

function Welcomes({ setModal }) {
  const dispatch = useDispatch();
  //  유저 ============================================================
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

  const [updateText, setUpdateText] = useState("");
  const changTextBoxHandler = (e) => {
    e.preventDefault();
    const accToken = getCookies("accessToken");
    dispatch(updateTextBox({ accToken, updateText })).then(() => {
      dispatch(resetUserInfo());

      setTimeout(() => {
        dispatch(getUserInfo({ accToken, thisUser }));
      }, 25);
    });
  };

  return (
    <form
      className="welcomeContainer df-jcc-aic"
      onSubmit={changTextBoxHandler}
    >
      <div className="welcomeBox">
        <div
          onClick={() => {
            setModal(false);
          }}
          className="close df-jcc-aic"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="welcomeForm">
          <input
            onChange={(e) => {
              setUpdateText(e.target.value);
            }}
            type="text"
            required
          />
          <span>대화명 변경</span>
          <input type="submit" value="변경" />
        </div>
      </div>
    </form>
  );
}

export default Welcomes;
