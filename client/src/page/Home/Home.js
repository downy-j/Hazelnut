/* eslint-disable*/

import React, { useContext } from "react";
import "./Home.css";

import RecentPost from "./RecentPost";
import Newlog from "./Newlog";
import Favorite from "./Favorite";
import Note from "./Note";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="homeContainer">
      <div className="recentPostBox">
        <div className="main__text">
          <h3>최근 게시글</h3>
        </div>
        <ul>
          <RecentPost />
        </ul>
      </div>

      <div className="newLogBox">
        <div className="main__text">
          <h3>새소식</h3>
        </div>
        <ul>
          <Newlog />
        </ul>
      </div>

      <div className="favoriteBox">
        <div className="main__text">
          <h3>관심사</h3>
        </div>
        <div className="favoriteList">
          <Favorite />
        </div>
      </div>

      <div className="noteBox">
        <div className="main__text">
          <h3>쪽지</h3>
        </div>
        {user ? (
          <div className="noteList">
            <ul>
              <Note />
            </ul>
          </div>
        ) : (
          <div className="noteSend">
            <textarea></textarea>
            <input type="submit" value="보내기" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
