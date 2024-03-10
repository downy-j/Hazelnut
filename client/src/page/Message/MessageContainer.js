/* eslint-disable*/

import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useSelector } from "react-redux";

function MessageContainer() {
  const { messageList } = useContext(ChatContext);

  const user = useSelector((state) => state.user);
  return (
    <div className="messageBody">
      {messageList.map((message, index) => {
        return (
          <div key={message.id}>
            {message.userNick === "system" ? (
              <div className="systemMeaasgeBox">
                <p className="systemMessage">downy님이 입장하셨습니다.</p>
              </div>
            ) : message.userNick === user.nick ? (
              <div className="myMessageBox">
                <div className="myMessage">{message.messageText}</div>
              </div>
            ) : (
              <div className="yourMessageBox">
                <img
                  src={
                    message.userNick !== user.nick
                      ? message.userProfileImg
                      : process.env.PUBLIC_URL + "/img/main/besicImg.jpg"
                  }
                  className="profileImage"
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].userNick === user.nick) ||
                    messageList[index - 1].userNick === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="yourMessage">{message.messageText}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MessageContainer;
