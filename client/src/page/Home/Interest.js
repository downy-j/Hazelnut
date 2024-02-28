/* eslint-disable*/

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { SERVER_URL, getCookies, getRequest } from "../../utile/service";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteInterest,
  getInterests,
  resetInterest,
} from "../../Store/InterestSlice";

function Interest() {
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

  // interest GET ==================================================
  useEffect(() => {
    try {
      const accToken = getCookies("accessToken");
      if (accToken) {
        dispatch(getInterests({ accToken, thisUser }));
      }
    } catch (error) {
      console.error("비동기 작업 실패:", error);
    }

    return () => {
      console.log("언마운트");
      dispatch(resetInterest()); // 컴포넌트가 언마운트될 때 쪽지 데이터 초기화
    };
  }, [dispatch, thisUser]);

  // interest 불러오기
  const interest = useSelector((state) => state.interest);
  console.log("interest >> ", interest);

  // interest 페이지 기능 ==================================================
  const [isHover, setHover] = useState(new Array(interest.length).fill(false));

  const handleMouseEnter = (index) => {
    setHover((prev) => {
      const newIsHover = [...prev];
      newIsHover[index] = true;
      return newIsHover;
    });
  };

  const handleMouseLeave = (index) => {
    const copyHoverState = [...isHover];
    copyHoverState[index] = false;
    setHover(copyHoverState);
  };

  // delete Interest
  const deleteHandler = (interestId) => {
    const accToken = getCookies("accessToken");

    dispatch(deleteInterest({ accToken, interestId }))
      .then(() => {
        dispatch(resetInterest());

        setTimeout(() => {
          dispatch(getInterests({ accToken, thisUser }));
        }, 25);
      })
      .catch((error) => {
        console.error("삭제 후 데이터 가져오기 실패:", error);
      });
  };

  return (
    <>
      {interest.map((interest, index) => (
        <div
          key={index}
          className="interest_item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <span className="interest">{interest.interest}</span>
          {isHover[index] && (
            <button
              onClick={() => deleteHandler(interest.id)}
              className="deleteBtn"
            >
              ❌
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default Interest;
