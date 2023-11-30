/* eslint-disable*/

import { useEffect, useState } from "react";
import Alram from "../components/Modal/Alram";
import SideBar from "../components/Tabs/sideBar";

const Main = () => {
  const [modal, setModal] = useState(true);
  const [today, setToday] = useState(100);
  const [total, setTotal] = useState(1000);
  const [sideBtn, setSideBtn] = useState(true);

  const btnClick = () => {
    setSideBtn(!sideBtn);
    if (!sideBtn) {
      document.querySelector(".menu-btn").style.left = "92px";
      document.querySelector(".menu-btn i").style.transform = "rotate(180deg)";
    } else {
      document.querySelector(".menu-btn").style.left = "0px";
      document.querySelector(".menu-btn i").style.transform = "rotate(0deg)";
    }
  };

  return (
    <>
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
          {sideBtn ? <SideBar /> : null}
        </div>
        <div className="MainBox df-jcc-aic">
          <div className="MainLBox df-jcc-aic">
            <div className="diaryLBox">
              <div className="diaryLTBox df-jcc-aic mb-10">
                <p>
                  today <span> : {today}</span>
                </p>
                <p>
                  total <span> : {total}</span>
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
                <span className="SettingBtn3  btn">3</span>
                <span className="SettingBtn4 btn">4</span>
              </div>
            </div>
          </div>

          <div className="MainRBox df-jcc-aic">
            <div className="diaryRBox">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
