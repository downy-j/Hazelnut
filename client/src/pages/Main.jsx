/* eslint-disable*/

import { useEffect, useState } from "react";
import Alram from "../components/Modal/Alram";
import SideBar from "../components/Tabs/sideBar";
import Home from "../components/Tabs/Home";
import Search from "../components/Tabs/Search";
import Nuts from "../components/Tabs/Nuts";
import Make from "../components/Tabs/Make";
import Profile from "../components/Tabs/Profile";
import Welcome from "../components/Modal/Welcome";

const Main = () => {
  const [isAlramModal, setAlramModal] = useState(true);
  const [isWelcomeModal, setWelcomeModal] = useState(true);
  const [isSideBtn, setSideBtn] = useState(false);

  const [isToday, setToday] = useState(100);
  const [isTotal, setTotal] = useState(1000);

  const [isWelcome, setWelcome] = useState("대화명을 입력하세요");
  const [isUpdate, setUpdate] = useState("");

  const [isTabs, setTabs] = useState([
    "홈",
    "탐색",
    "너츠",
    "만들기",
    "프로필",
  ]);

  const [activeTab, setActiveTab] = useState(0);

  const btnClick = () => {
    setSideBtn(!isSideBtn);
    if (!isSideBtn) {
      document.querySelector(".menu-btn").style.left = "92px";
      document.querySelector(".menu-btn i").style.transform = "rotate(180deg)";
    } else {
      document.querySelector(".menu-btn").style.left = "0px";
      document.querySelector(".menu-btn i").style.transform = "rotate(0deg)";
    }
  };

  return (
    <>
      {!isWelcomeModal ? (
        <Welcome
          setUpdate={setUpdate}
          setWelcome={setWelcome}
          isUpdate={isUpdate}
          setWelcomeModal={setWelcomeModal}
          isAlramModal={isAlramModal}
        />
      ) : null}
      <div className="MainContainer df-jcc-aic">
        <div className="sideBox">
          <div
            className="menu-btn df-jcc-aic"
            onClick={() => {
              btnClick();
            }}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          {isSideBtn ? <SideBar /> : null}
        </div>
        <div className="MainBox df-jcc-aic">
          <div className="MainLBox df-jcc-aic">
            <div className="diaryLBox">
              <div className="diaryLTBox df-jcc-aic mb-10">
                <p>
                  today <span> : {isToday}</span>
                </p>
                <p>
                  total <span> : {isTotal}</span>
                </p>
              </div>

              <div className="diaryLMBox  mb-10">
                <div className="emotion df-jcc">
                  <p>
                    오늘의 감정 <span>❤️</span>
                  </p>
                </div>

                <div className="MyImg mb-10">
                  <img src="http://placehold.co/250x250" />
                </div>

                <div className="diaryIntroduction mb-10">
                  <p>
                    동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                    만세. 무궁화 삼천리 화려강산 대한 사람, 대한으로 길이
                    보전하세
                  </p>
                </div>
              </div>

              <div className="diarySettingBox df-jcc-aic mb-10">
                <span className="SettingBtn1 btn">1</span>
                <span className="SettingBtn2 btn">2</span>
                <span className="SettingBtn3 btn">3</span>
                <span className="SettingBtn4 btn">4</span>
              </div>
            </div>
          </div>

          <div className="MainRBox df-jcc-aic">
            <div className="diaryRBox">
              <div className="diaryRTBox ">
                <p
                  onClick={() => {
                    setWelcomeModal(!isWelcomeModal);
                  }}
                >
                  {isWelcome}
                </p>

                <div className="friend ">
                  <p
                    className="addFriend"
                    onClick={() => {
                      alert("친구신청을합니다");
                    }}
                  >
                    <span>➕</span> 친구맺기
                  </p>

                  <p className="alram">
                    <i class="fa-regular fa-bell"></i>
                  </p>
                </div>
              </div>

              <div className="rightMenuTab">
                {isTabs.map((isTab, index) => (
                  <div
                    key={index}
                    className="tab df-jcc-aic"
                    onClick={() => setActiveTab(index)}
                  >
                    <span>{isTab}</span>
                  </div>
                ))}
              </div>

              <div className="diaryCanvas">
                {isTabs[activeTab] === "홈" && <Home />}
                {isTabs[activeTab] === "탐색" && <Search />}
                {isTabs[activeTab] === "너츠" && <Nuts />}
                {isTabs[activeTab] === "만들기" && <Make />}
                {isTabs[activeTab] === "프로필" && <Profile />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
