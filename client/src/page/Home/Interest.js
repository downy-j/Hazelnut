/* eslint-disable*/

import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Interest() {
  const { isInterests } = useContext(UserContext);
  return (
    <div>
      {isInterests.map((interest, index) => (
        <span key={index} className="interest">
          {interest.interest}
        </span>
      ))}
    </div>
  );
}

export default Interest;
