/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import "./Home.css";

import RecentPost from "./RecentPost";
import Newlog from "./Newlog";
import Interest from "./Interest";
import Note from "./Note";
import { useSelector } from "react-redux";
import { UserContext } from "../../context/UserContext";

function Home() {
  const { isNotes, thisUser } = useContext(UserContext);
  // note
  const itemsPerPage = 5; // 페이지당 보여질 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 디폴트 값
  const totalPages = Math.ceil(isNotes.length / itemsPerPage); // 전체 페이지 = 총 아이템 / 페이지당 보여질 이이템 수
  const [leftBtn, setLeftBtn] = useState(false); // 왼쪽
  const [rightBtn, setRightBtn] = useState(false); // 오른쪽

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setLeftBtn(true); // 버튼 클릭 상태 변경
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setRightBtn(true); // 버튼 클릭 상태 변경
  };

  const currentItems = isNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (leftBtn) {
      setTimeout(() => {
        setLeftBtn(false);
      }, 200);
    }

    if (rightBtn) {
      setTimeout(() => {
        setRightBtn(false);
      }, 200);
    }
  }, [leftBtn, rightBtn]);

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
          <div className="pagingBox">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={leftBtn ? "clicked" : ""}
            >
              <i className="fa-solid fa-caret-left"></i>
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={rightBtn ? "clicked" : ""}
            >
              <i className="fa-solid fa-caret-right"></i>
            </button>
          </div>
        </div>
        {thisUser ? (
          <div className="noteList">
            <Note currentItems={currentItems} />
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
