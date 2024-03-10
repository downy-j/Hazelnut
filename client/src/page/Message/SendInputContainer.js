import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

function SendInputContainer() {
  const { setMessage, message, sendMyMessage } = useContext(ChatContext);
  return (
    <div className="sendMessageBody">
      <div className="plusBtn">+</div>
      <form className="messageInputBox" onSubmit={sendMyMessage}>
        <input
          placeholder="Type in here. . "
          value={message}
          multiple={false}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn" type="submit" disabled={message === ""}>
          전송
        </button>
      </form>
    </div>
  );
}

export default SendInputContainer;
