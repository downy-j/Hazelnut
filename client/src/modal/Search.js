/* eslint-disable*/

import React, { useContext } from "react";
import "./Search.css";
import PeopleBox from "../components/PeopleBox";
import { UserContext } from "../context/UserContext";

function Search() {
  const { findUserCB, searchUserValue, setSearchUserValue } =
    useContext(UserContext);

  return (
    <div className="searchBox">
      <form className="searchInput" onSubmit={findUserCB}>
        <input
          type="text"
          value={searchUserValue}
          onChange={(e) => {
            setSearchUserValue(e.target.value);
          }}
        />
        <input type="submit" value="검색" />
      </form>
      <PeopleBox />
    </div>
  );
}

export default Search;
