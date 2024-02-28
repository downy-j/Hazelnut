import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PeopleBox({ searchUserResults }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("prpstate", () => {
      navigate(window.location.href);
    });
  }, []);

  return (
    <ul className="searchResult">
      {searchUserResults ? (
        searchUserResults.map((user, index) => (
          <li key={index} className="peopleBox">
            <img
              src={process.env.PUBLIC_URL + "/img/main/besicImg.jpg"}
              alt="user_img"
            />
            <div className="userInfo">
              <span className="user_Name">{user.nick}</span>
              <span className="user_Text">{user.UserInfo.textBox}</span>
            </div>
            <div className="LinkBtn">
              <button
                className="goUserPage"
                onClick={() => navigate(`/${user.nick}`)}
              >
                방문하기
              </button>
              <button className="goUserChat">채팅하기</button>
            </div>
          </li>
        ))
      ) : (
        <li>User Not found</li>
      )}
    </ul>
  );
}

export default PeopleBox;
