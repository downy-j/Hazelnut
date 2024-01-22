/* eslint-disable*/

import React, { useContext, useState } from "react";
import "./Welcomes.css";
import { UserContext } from "../context/UserContext";

function Welcomes({ setModal }) {
  const { isText, setText, updateTextBox } = useContext(UserContext);

  const updateText = () => {};

  return (
    <div className="welcomeContainer df-jcc-aic">
      <div className="welcomeBox">
        <div
          onClick={() => {
            setModal(false);
          }}
          className="close df-jcc-aic"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="welcomeForm">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            required
          />
          <span>대화명 변경</span>
          <input
            onClick={() => updateTextBox(isText)}
            type="submit"
            value="변경"
          />
        </div>
      </div>
    </div>
  );
}

export default Welcomes;
