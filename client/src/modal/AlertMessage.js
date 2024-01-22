import React from "react";
import "./AlertMessage.css";

function AlertMessage({ message }) {
  return (
    <div className="alert-container">
      <div className="alert-message">{message}</div>
    </div>
  );
}

export default AlertMessage;
