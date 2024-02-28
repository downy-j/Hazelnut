import React, { useCallback, useContext, useEffect, useState } from "react";
import "./AddIntererst.css";
import { UserContext } from "../context/UserContext";
import { SERVER_URL, getCookies, postRequest } from "../utile/service";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserInterest,
  getInterests,
  resetInterest,
} from "../Store/InterestSlice";
import { useParams } from "react-router-dom";

function AddInterest({ setAddInterestModal }) {
  const dispatch = useDispatch();
  //  유저 ============================================================
  const user = useSelector((state) => state.user.nick);
  const [thisUser, setThisUser] = useState(null);
  const { userNick } = useParams();
  useEffect(() => {
    if (user === userNick) {
      // 로그인한사람과 파라메터가 같을때
      setThisUser(user);
    } else {
      //로그인 한사람과 파라메터가 다를때
      setThisUser(userNick);
    }
  }, [user, userNick]);
  // 관신사 POST ================================================================
  const [addInterest, setAddInterest] = useState(null); // 입력값을 담을 상태
  const addMyInterest = (e) => {
    e.preventDefault();
    const accToken = getCookies("accessToken");

    dispatch(addUserInterest({ accToken, addInterest })).then(() => {
      dispatch(resetInterest());
      setTimeout(() => {
        dispatch(getInterests({ accToken, thisUser }));
      }, 10);
    });
  };
  // const addMyInterest = useCallback(
  //   async (e) => {
  //     e.preventDefault();

  //     const accToken = getCookies("accessToken");
  //     const response = postRequest(
  //       `${SERVER_URL}/interest`,
  //       { interest: addInterest },
  //       accToken,
  //       "application/json"
  //     );

  //     if (response.error) {
  //       console.error(response);
  //     }
  //   },
  //   [addInterest]
  // );

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
