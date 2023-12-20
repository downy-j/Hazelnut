import React, { useState } from "react";
import "./Welcomes.css";

function Welcomes({ setWelcomeText, setText, isText, setWlcome }) {
  const changeText = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="welcomeContainer df-jcc-aic">
      <div className="welcomeBox">
        <div
          onClick={() => {
            setWlcome("false");
          }}
          className="close df-jcc-aic"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="welcomeForm">
          <input
            onChange={(e) => {
              changeText(e);
            }}
            type="text"
            required
          />
          <span>대화명 변경</span>
          <input
            onClick={() => {
              setWelcomeText(isText);
            }}
            type="submit"
            value="변경"
          />
        </div>
      </div>
    </div>
  );
}

export default Welcomes;
