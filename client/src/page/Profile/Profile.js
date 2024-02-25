/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Photos from "./Photos";
import Videos from "./Videos";
import Saved from "./Saved";
import { UserContext } from "../../context/UserContext";

function Profile() {
  const { thisUser, user, setThisUser } = useContext(UserContext);
  const { userNick } = useParams();

  const [isPhotos, setPhotos] = useState([
    {
      img: "/img/photos/unaLee.gif",
    },
  ]);
  const [isVideos, setVideos] = useState([
    {
      videos: "/img/videos/unaLee.mp4",
    },
  ]);

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
          <Route
            path="/photos"
            element={<Photos isPhotos={isPhotos} />}
          ></Route>
          <Route
            path="/videos"
            element={<Videos isVideos={isVideos} />}
          ></Route>
          <Route
            path="/saved"
            element={<Saved isPhotos={isPhotos} isVideos={isVideos} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
