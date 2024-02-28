/* eslint-disable*/

import React, { useEffect, useState } from "react";
import "./Leftbox.css";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "../utile/service";
import {
  getUserInfo,
  myProfileImage,
  resetUserInfo,
} from "../Store/UserInfoSlice";

function Leftbox() {
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

  // =========================================================================================
  const [preViewBox, setPreViewBox] = useState(null); // 미리보기 박스
  const [isImage, setImage] = useState(null); // 고른 사진 담는 박스

  // 내 프로필사진 데이터 정제와 프리뷰
  const myProfilePreview = (e) => {
    const file = e.target.files[0];

    setImage(file); // 사진한장 담음

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreViewBox(reader.result);
      };
    }
  };

  // 내 프로필 사진 등록
  const updateProFileImage = (e) => {
    e.preventDefault();
    const accToken = getCookies("accessToken");
    const formData = new FormData();
    formData.append("image", isImage);
    if (accToken) {
      dispatch(myProfileImage({ accToken, formData, thisUser }));
    }
  };

  // =========================================================================================

  // userInfo 가져오기
  useEffect(() => {
    try {
      const accToken = getCookies("accessToken");
      if (accToken) {
        dispatch(getUserInfo({ accToken, thisUser }));
      }
    } catch (error) {
      console.error("비동기 작업 실패:", error);
    }

    return () => {
      // 언마운트시 리셋
      dispatch(resetUserInfo());
    };
  }, [dispatch, thisUser]);

  // userInfo 불러오기
  const userInfo = useSelector((state) => state.userInfo);

  // =========================================================================================

  return (
    <div className="leftBox">
      <div className="visit__count df_jcc_aic">
        <span>today : {userInfo.today}</span>
        <span>total : {userInfo.total}</span>
      </div>

      <div className="imgBox">
        <img
          className="df_jcc_aic"
          src={
            preViewBox === null
              ? userInfo.imgURL === null
                ? process.env.PUBLIC_URL + "/img/main/besicImg.jpg"
                : userInfo.imgURL
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
          <button onClick={updateProFileImage} className="imgSubmitBtn">
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
          <div className="count">0</div>
        </div>
      </div>
    </div>
  );
}

export default Leftbox;
