import React from "react";
import "./Leftbox.css";

function Leftbox({ isCount }) {
  return (
    <div className="leftBox">
      <div className="visit__count df_jcc_aic">
        <span>today : 0</span>
        <span>total : 0</span>
      </div>

      <img
        className="df_jcc_aic"
        src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"}
        alt="my__Image"
      />

      <span
        className="conversation__Text"
        style={{ border: "1px solid white" }}
      >
        conversation__Text
      </span>

      <div className="setting__buttons df_jcc_aic">
        <div className="menu__button">
          <i className="fa-solid fa-gear"></i>
        </div>
        <div className="menu__button">
          <i className="fa-regular fa-bell"></i>
          <div className="count">{isCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Leftbox;
