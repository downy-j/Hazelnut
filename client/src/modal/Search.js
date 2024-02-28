/* eslint-disable*/

import React, { useCallback, useContext, useState } from "react";
import "./Search.css";
import PeopleBox from "../components/PeopleBox";
import { UserContext } from "../context/UserContext";
import { SERVER_URL, getCookies, getRequest } from "../utile/service";

function Search() {
  // const { findUserCB, searchUserValue, setSearchUserValue } =
  //   useContext(UserContext);

  // find User =================================================
  const [searchUserValue, setSearchUserValue] = useState(""); // 입력값을 담을 상태
  const [searchUserResults, setSearchUserResults] = useState([]); // 서버 응답을 담을 배열 상태
  const findUsers = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const accToken = getCookies("accessToken");
        const response = await getRequest(
          `${SERVER_URL}/${searchUserValue}/find`,
          accToken
        );

        if (response.error) {
          setErrorMessage(response.error);
        } else {
          setSearchUserResults(response);
        }
      } catch (error) {
        console.error("Error occurred while fetching user:", error);
      }
    },
    [searchUserValue]
  );

  return (
    <div className="searchBox">
      <form className="searchInput" onSubmit={findUsers}>
        <input
          type="text"
          value={searchUserValue}
          onChange={(e) => {
            setSearchUserValue(e.target.value);
          }}
        />
        <input type="submit" value="검색" />
      </form>
      <PeopleBox searchUserResults={searchUserResults} />
    </div>
  );
}

export default Search;
