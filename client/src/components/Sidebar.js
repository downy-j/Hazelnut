import { useEffect, useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isArrow, setArrow] = useState(true); // 닽힘

  useEffect(() => {
    if (!isArrow) {
      document.querySelector(".sideBar__button").style.left = "8%";
      document.querySelector(".sideBar__button i").style.transform =
        "rotate(180deg)";
    } else {
      document.querySelector(".sideBar__button").style.left = "0px";
      document.querySelector(".sideBar__button i").style.transform =
        "rotate(0deg)";
    }
  }, [isArrow]);

  const handleBtn = () => {
    setArrow(!isArrow);
  };

  return (
    <>
      {!isArrow ? (
        <div className="sideBar">
          <div className="sideBar__menu">
            <div className="menu__button">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="menu__button">
              <i class="fa-regular fa-pen-to-square"></i>
            </div>
            <div className="menu__button">
              <i class="fa-regular fa-message"></i>
            </div>
            <div className="menu__button">
              <i class="fa-regular fa-message"></i>
            </div>
          </div>
        </div>
      ) : null}

      <div onClick={handleBtn} className="sideBar__button">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </>
  );
}

export default Sidebar;
