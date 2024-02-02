/* eslint-disable*/

import React, { useContext, useState } from "react";
import "./Welcomes.css";
import { UserContext } from "../context/UserContext";

function Welcomes({ setModal }) {
  const { setUpdateText, updateOnLineID } = useContext(UserContext);

  return (
    <form className="welcomeContainer df-jcc-aic" onSubmit={updateOnLineID}>
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
              setUpdateText(e.target.value);
            }}
            type="text"
            required
          />
          <span>대화명 변경</span>
          <input type="submit" value="변경" />
        </div>
      </div>
    </form>
  );
}

export default Welcomes;
