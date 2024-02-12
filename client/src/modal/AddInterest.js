import React, { useContext } from "react";
import "./AddIntererst.css";
import { UserContext } from "../context/UserContext";

function AddInterest({ setAddInterestModal }) {
  const { setAddInterest, addMyInterest } = useContext(UserContext);
  return (
    <form className="addInterestContainer df-jcc-aic" onSubmit={addMyInterest}>
      <div className="addInterestBox">
        <div
          onClick={() => {
            setAddInterestModal(false);
          }}
          className="close df-jcc-aic"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="addInterestForm">
          <input
            onChange={(e) => {
              setAddInterest(e.target.value);
            }}
            type="text"
            required
          />
          <span>관심사 등록</span>
          <input type="submit" value="추가" />
        </div>
      </div>
    </form>
  );
}

export default AddInterest;
