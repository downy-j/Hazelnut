import React, { useState } from "react";
import "./Mainpage.css";
import Sidebar from "../components/Sidebar";
import Leftbox from "../components/Leftbox";
import { Link, Route, Routes } from "react-router-dom";
import Welcomes from "../modal/Welcomes";
import Arlams from "../modal/Arlams";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
function Mainpage() {
  // 알람
  const [isCount, setCount] = useState(0);

  // 대화명
  const [isWlcome, setWlcome] = useState(false);
  const [isWlcomeText, setWelcomeText] = useState("대화명을 입력하세요");
  const [isText, setText] = useState("");
  const handleModal = () => {
    setWlcome(!isWlcome);
  };

  // 친추
  const addFrind = () => {
    alert("친구를 추가");
  };

  // 유저 로그인 true = 유저, false = 손님
  const [isUser, setUser] = useState(false);
  return (
    <div className="mainBox df_jcc_aic">
      <Sidebar />
      {isWlcome ? (
        <Welcomes
          setWelcomeText={setWelcomeText}
          setText={setText}
          isText={isText}
          setWlcome={setWlcome}
        />
      ) : null}
      {<Arlams />}
      <div className="mainBox__left df_jce_aic">
        <Leftbox isCount={isCount} />
      </div>

      <div className="mainBox__right df-jcs_aic">
        <div className="rightBox">
          <div className="rightTopBox">
            <div className="wellcomText" onClick={handleModal}>
              <span>{isWlcomeText}</span>
            </div>
            {isUser === true ? null : (
              <div onClick={addFrind} className="addFrind">
                ➕ <span>친구추가</span>
              </div>
            )}
          </div>
          <div className="containers" style={{ border: "1px solid white" }}>
            <Routes>
              <Route path="/" element={<Home isUser={isUser} />}></Route>
              <Route path="/:userId/*" element={<Profile />}></Route>
            </Routes>
          </div>
        </div>

        <div className="tabBox">
          <div className="tab___button">
            <Link to="/">Home</Link>
          </div>
          <div className="tab___button">
            <Link to="/:userId/photos">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
