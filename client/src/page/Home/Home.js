/* eslint-disable*/

import React, { useContext } from "react";
import "./Home.css";

import RecentPost from "./RecentPost";
import Newlog from "./Newlog";
import Interest from "./Interest";
import Note from "./Note";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.data.user.nick);

  return (
    <div className="homeContainer">
      <div className="recentPostBox">
        <div className="main__text">
          <h3>최근 게시글</h3>
        </div>

        <RecentPost />
      </div>

      <div className="newLogBox">
        <div className="main__text">
          <h3>새소식</h3>
        </div>

        <Newlog />
      </div>

      <div className="interestBox">
        <div className="main__text">
          <h3>관심사</h3>
        </div>
        <div className="interestList">
          <Interest />
        </div>
      </div>

      <div className="noteBox">
        <div className="main__text">
          <h3>쪽지</h3>
        </div>
        {user ? (
          <div className="noteList">
            <Note />
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
