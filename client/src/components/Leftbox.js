import React, { useContext } from "react";
import "./Leftbox.css";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";

function Leftbox({ isCount }) {
  const { fileHandler, imgSRC } = useContext(PostContext);
  const { isTodays, isTotals, isImageURL } = useContext(UserContext);

  return (
    <div className="leftBox">
      <div className="visit__count df_jcc_aic">
        <span>today : {isTodays}</span>
        <span>total : {isTotals}</span>
      </div>

      <div className="imgBox">
        <img
          className="df_jcc_aic"
          src={
            imgSRC
              ? isImageURL
              : process.env.PUBLIC_URL + "/img/main/besicImg.jpg"
          }
          alt="my__Image"
        />
        <input onChange={(e) => fileHandler(e)} type="file" />
      </div>

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
