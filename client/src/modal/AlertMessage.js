import React, { useContext } from "react";
import "./AlertMessage.css";
import { UserContext } from "../context/UserContext";

function AlertMessage() {
  return (
    <div className="alert-container">
      <div className="alert-message"></div>
    </div>
  );
}

export default AlertMessage;
