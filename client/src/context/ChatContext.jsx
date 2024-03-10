import { useCallback } from "react";
import { createContext, useState, useEffect } from "react";
import {
  SERVER_URL,
  getCookies,
  getRequest,
  postRequest,
} from "../utile/service";
import { useSelector } from "react-redux";
import socket from "../server";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const user = useSelector((state) => state.user.nick) || null;
  const [chatRoomName, setChatRoomName] = useState(null); // 채팅방 이름
  const [findUserNick, setFindUserNick] = useState(null); // 입력한 유저명
  const [chatWithUserList, setChatWithUserList] = useState(null);
  const [clickedUser, setClickedUser] = useState(null); // 함께 채팅 할라고 클릭한 유저

  const [myRooms, setMyRooms] = useState([]); // 함께 채팅 할 유저

  const [roomNumber, setRoomNumber] = useState(null);
  const [message, setMessage] = useState(null); // 메시지 담을 그릇
  const [guest, setGuest] = useState(null);
  const [guestImg, setGuestImg] = useState(null);
  const [messageList, setMessageList] = useState([]); // 채팅 목록
  // console.log("messageList >> ", messageList);
  // 유저정보 가져오기 - 유저 찾기
  useEffect(() => {
    const findUser = async () => {
      const accToken = getCookies("accessToken");
      if (accToken) {
        const response = await getRequest(
          `${SERVER_URL}/${findUserNick}/find`,
          accToken
        );

        if (response.error) {
          console.error("유저를 찾을수 없습니다.", response.error);
        }
        setChatWithUserList(response);
      }
    };
    findUser();
  }, [findUserNick]);

  // 방만들기
  const createChatRooms = () => {
    const accToken = getCookies("accessToken");
    socket.emit(
      "createChatRoom",
      { chatRoomName, clickedUser, accToken },
      () => {
        socket.on("createChatRoomSuccess", (response) => {
          console.log("채팅방 생성 성공:", response.message);
        });

        socket.on("createChatRoomError", (response) => {
          console.log("채팅방 생성 실패:", response.error);
        });
      }
    );
  };

  // 내 채팅방 가져오기
  useEffect(() => {
    const accToken = getCookies("accessToken");
    socket.emit("getRooms", { accToken });

    socket.on("successRoomList", (data) => {
      setMyRooms(data.response.roomNames);
    });
  }, [user]);

  // 선택한 채팅 대화방 열기
  const clickThisRoom = useCallback(
    async (roomId) => {
      await setRoomNumber(roomId.id);

      // 선택한 방의 메시지 목록 가져오기
      socket.emit("getMessages", { roomNumber });

      socket.on("thisRoomsChatList", ({ response }) => {
        setMessageList(response);
      });
    },
    [roomNumber]
  );

  // 메시지 보내기
  const sendMyMessage = useCallback(
    async (e) => {
      e.preventDefault();

      socket.emit("sendMessage", { message, roomNumber });
    },
    [roomNumber, message]
  );

  // 보낸 메시지 가져오기
  useEffect(() => {
    socket.on("message", (response) => {
      setMessageList((messageList) => [...messageList, response]);
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        setChatRoomName,
        setFindUserNick,
        chatWithUserList,
        createChatRooms,
        setClickedUser,
        myRooms,
        clickThisRoom,
        message,
        setMessage,
        sendMyMessage,
        messageList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
