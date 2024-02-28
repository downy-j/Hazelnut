/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Photos from "./Photos";
import Videos from "./Videos";
import Saved from "./Saved";
import { UserContext } from "../../context/UserContext";
import { useSelector } from "react-redux";

function Profile() {
  //  유저 ============================================================
  const user = useSelector((state) => state.user.nick);
  const [thisUser, setThisUser] = useState(null);
  const { userNick } = useParams();
  useEffect(() => {
    if (user === userNick) {
      // 로그인한사람과 파라메터가 같을때
      setThisUser(userNick);
    } else {
      //로그인 한사람과 파라메터가 다를때
      setThisUser(user);
    }
  }, [user, userNick]);

  return (
    <div className="profileContainer">
      <div className="profile__menu">
        <Link to={`/${thisUser}/photos`} className="photos">
          <i className="fa-solid fa-camera-retro"></i>
          사진
        </Link>
        <Link to={`/${thisUser}/videos`} className="videos">
          <i className="fa-solid fa-film"></i>
          영상
        </Link>
        <Link to={`/${thisUser}/saved`} className="saved">
          <i className="fa-regular fa-bookmark"></i>
          저장
        </Link>
      </div>
      <div className="convas df_jcc_aic">
        <Routes>
          <Route path="/photos" element={<Photos />}></Route>
          <Route path="/videos" element={<Videos />}></Route>
          <Route path="/saved" element={<Saved />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
