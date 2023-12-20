/* eslint-disable*/

import React from "react";
import "./Arlams.css";

function Arlams() {
  return (
    <div className="alram df_jcc_aic" style={{ display: "none" }}>
      <ul>
        <li>
          <div className="alramBox df_jcc_aic">
            <img src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"} />
            <div className="alramContent">
              <h5>Downy</h5>
              <p>
                회원님의 게시글을 좋아합니다.
                <br />
                <span>11월 28일 04:22</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Arlams;
