/* eslint-disable*/

import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function Interest() {
  const { isInterests, setIndexOfInterest, deleteInterestItem } =
    useContext(UserContext);
  // console.log(`isInterests >> ${JSON.stringify(isInterests[3].id)}`);

  const [isHover, setHover] = useState(
    new Array(isInterests.length).fill(false)
  );

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

  const deleteHandler = (id) => {
    setIndexOfInterest(id);
  };

  return (
    <>
      {isInterests.map((interest, index) => (
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
