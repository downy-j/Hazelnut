import { useContext, useEffect, useState } from "react";
import "./Sidebar.css";

import Search from "../modal/Search";
import Make from "../modal/Make";
import Message from "../page/Message";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();

  const { userLogout } = useContext(AuthContext);

  const [isArrow, setArrow] = useState(false); // 닽힘
  const [isSearch, setSearch] = useState(false); // 닫힘
  const [isMake, setMake] = useState(false); // 닫힘
  const [isMessage, setMessage] = useState(false);

  useEffect(() => {
    if (!isArrow) {
      document.querySelector(".sideBar__button").style.left = "0px";
      document.querySelector(".sideBar__button i").style.transition = "0.5s";
      document.querySelector(".sideBar__button i").style.transform =
        "rotate(0deg)";
    } else {
      document.querySelector(".sideBar__button").style.left = "5%";
      document.querySelector(".sideBar__button i").style.transition = "0.5s";
      document.querySelector(".sideBar__button i").style.transform =
        "rotate(180deg)";
    }
  }, [isArrow]);

  const handleBtn = () => {
    setArrow(!isArrow);
    if (isArrow === true && isSearch === true) {
      setArrow(false);
      setSearch(false);
      document.querySelector(".sideBar__button").style.left = "23%";
    }
  };

  const searchHandler = () => {
    setSearch(!isSearch);
    if (!isSearch) {
      document.querySelector(".sideBar__button").style.left = "23%";
    } else {
      document.querySelector(".sideBar__button").style.left = "5%";
    }
  };

  const makeHandler = () => {
    setMake(!isMake);
    setSearch(false);
    if (isSearch === false) {
      document.querySelector(".sideBar__button").style.left = "5%";
    }
  };

  const messageHandler = () => {
    setMessage(!isMessage);
    setSearch(false);
    if (!isSearch) {
      document.querySelector(".sideBar__button").style.left = "23%";
    } else {
      document.querySelector(".sideBar__button").style.left = "5%";
    }
  };
  const logoutHandler = () => {
    userLogout();
    navigate("/");
  };

  return (
    <>
      {isArrow ? (
        <div className="sideBar">
          <div className="sideBar__menu">
            <div className="sideTop_btnBox">
              <div onClick={searchHandler} className="menu__button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div onClick={makeHandler} className="menu__button">
                <i className="fa-regular fa-pen-to-square"></i>
              </div>
              <Link to="/message" className="menu__button">
                <i className="fa-regular fa-message"></i>
              </Link>
            </div>
            <div className="sideBottom__btnBox">
              <div onClick={logoutHandler} className="menu__button">
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isSearch ? <Search /> : null}
      {isMake ? <Make makeHandler={makeHandler} /> : null}
      <div onClick={handleBtn} className="sideBar__button">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </>
  );
}

export default Sidebar;
