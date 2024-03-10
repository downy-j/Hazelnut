/* eslint-disable*/

import React, { useContext, useState } from "react";
import "./Message.css";
import Sidebar from "../components/Sidebar";
import CreateRoom from "../modal/CreateRoom";
import { ChatContext } from "../context/ChatContext";
import MessageContainer from "./Message/MessageContainer";
import SendInputContainer from "./Message/SendInputContainer";

function Message() {
  const { myRooms, clickThisRoom } = useContext(ChatContext);

  const [creatRoom, setCreateRoom] = useState(false); // 방 생성 모달
  const createRoomHandler = () => {
    setCreateRoom(!creatRoom);
  };

  return (
    <div className="chatContainer df_jcc_aic">
      <Sidebar />
      <div className="chatRoomsList df_jce_aic">
        <div className="chatRooms">
          <div className="create_CahtRooms">
            <span className="plus">➕</span>
            <button onClick={createRoomHandler} className="created">
              채팅방 생성하기
            </button>
            {creatRoom && <CreateRoom />}
          </div>
          <div className="ChatListBox">
            <ul>
              {myRooms.length > 0 ? (
                myRooms.map((myRoom, index) => (
                  <li key={index} onClick={() => clickThisRoom(myRoom)}>
                    <div className="ChatFrontImgs">
                      {myRoom.members &&
                        myRoom.members.map((member, memberIndex) => (
                          <img
                            key={memberIndex}
                            src={
                              member.imgURL
                                ? member.imgURL
                                : process.env.PUBLIC_URL +
                                  "/img/main/besicImg.jpg"
                            }
                            alt="Member avatar"
                          ></img>
                        ))}
                    </div>
                    <span>{myRoom.title}</span>
                  </li>
                ))
              ) : (
                <li>
                  <span>
                    채팅방이 없습니다. <br />
                    새로운 채팅방을 생성하세요.
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="messageBox df-jcs_aic">
        <div className="message">
          <MessageContainer />
          <SendInputContainer />
        </div>
      </div>
    </div>
  );
}

export default Message;
