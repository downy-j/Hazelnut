import React, { useContext } from "react";
import "./Leftbox.css";
import { UserContext } from "../context/UserContext";

function Leftbox({ isCount }) {
  const {
    isTodays,
    isTotals,
    myProfilePreview,
    preViewBox,
    myProfileImage,
    myProfileImageURL,
    setPreViewBox,
  } = useContext(UserContext);

  const normalizeImagePath = (imagePath) => {
    setPreViewBox(null);
    return imagePath.replace(/\\/g, "/");
  };

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
            preViewBox === null
              ? process.env.PUBLIC_URL + "/img/main/besicImg.jpg"
              : preViewBox
          }
          alt="my__Image"
        />
        <input type="file" name="file" onChange={myProfilePreview} />
        {preViewBox && (
          <button onClick={myProfileImage} className="imgSubmitBtn">
            적용하기
          </button>
        )}
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
