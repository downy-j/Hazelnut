/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Mainpage.css";
import Sidebar from "../components/Sidebar";
import Leftbox from "../components/Leftbox";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Welcomes from "../modal/Welcomes";
import Arlams from "../modal/Arlams";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import { UserContext } from "../context/UserContext";

function Mainpage() {
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

  // 대화명
  const [isModal, setModal] = useState(false); // 모달 열고 닫고
  const handleModal = () => {
    setModal(!isModal);
  };

  // 친추
  const addFrind = () => {
    alert("친구를 추가");
  };

  // userInfo 불러오기
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div className="mainBox df_jcc_aic">
      <Sidebar />
      {isModal ? <Welcomes setModal={setModal} /> : null}
      {<Arlams />}
      <div className="mainBox__left df_jce_aic">
        <Leftbox />
      </div>

      <div className="mainBox__right df-jcs_aic">
        <div className="rightBox">
          <div className="rightTopBox">
            {user === userNick ? (
              <div className="wellcomText" onClick={handleModal}>
                <span>{userInfo.textBox}</span>
              </div>
            ) : (
              <div className="wellcomText">
                <span>{userInfo.textBox}</span>
              </div>
            )}
            {user && user !== userNick && (
              <div onClick={addFrind} className="addFrind">
                ➕ <span>친구추가</span>
              </div>
            )}
          </div>
          <div className="containers" style={{ border: "1px solid white" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Profile />} />
            </Routes>
          </div>
        </div>

        <div className="tabBox">
          <div className="tab___button">
            <Link to={`/${thisUser}`}>Home</Link>
          </div>
          <div className="tab___button">
            <Link to={`/${thisUser}/photos`}>Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
