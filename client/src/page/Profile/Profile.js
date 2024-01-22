/* eslint-disable*/

import React, { useContext, useState } from "react";
import "./Profile.css";
import { Link, Route, Routes } from "react-router-dom";
import Photos from "./Photos";
import Videos from "./Videos";
import Saved from "./Saved";
import { UserContext } from "../../context/UserContext";

function Profile() {
  const { userNick } = useContext(UserContext);

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
  return (
    <div className="profileContainer">
      <div className="profile__menu">
        <Link to={`/${userNick}/photos`} className="photos">
          <i className="fa-solid fa-camera-retro"></i>
          사진
        </Link>
        <Link to={`/${userNick}/videos`} className="videos">
          <i className="fa-solid fa-film"></i>
          영상
        </Link>
        <Link to={`/${userNick}/saved`} className="saved">
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
