import React, { useContext } from "react";
import "./AlertMessage.css";
import { UserContext } from "../context/UserContext";

function AlertMessage() {
  const { isErrorMessage } = useContext(UserContext);
  return (
    <div className="alert-container">
      <div className="alert-message">{isErrorMessage}</div>
    </div>
  );
}

export default AlertMessage;
