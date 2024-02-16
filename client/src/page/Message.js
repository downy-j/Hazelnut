import React from "react";
import "./Message.css";
import Sidebar from "../components/Sidebar";

function Message() {
  return (
    <div className="chatContainer df_jcc_aic">
      <Sidebar />
      <div className="chatRoomsList df_jce_aic">
        <div className="chatRooms"></div>
      </div>
      <div className="messageBox df-jcs_aic">
        <div className="message"></div>
      </div>
    </div>
  );
}

export default Message;
