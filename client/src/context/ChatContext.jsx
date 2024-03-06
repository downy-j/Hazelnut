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
  // const createChatRooms = useCallback(
  //   async (e) => {
  //     e.preventDefault();

  //     const accToken = getCookies("accessToken");
  // const response = await postRequest(
  //   `${SERVER_URL}/message/createChatRoom`,
  //   {
  //     chatRoomName: chatRoomName,
  //     clickedUser: clickedUser,
  //   },
  //   accToken,
  //   "application/json"
  // );

  //     if (response.error) {
  //       console.error("요청에러", response.error);
  //     }
  //   },
  //   [chatRoomName, clickedUser]
  // );

  // 내 채팅방 가져오기
  useEffect(() => {
    const accToken = getCookies("accessToken");
    socket.emit("getRooms", { accToken });

    socket.on("successRoomList", (data) => {
      setMyRooms(data.response.roomNames);
    });
  }, []);

  // useEffect(() => {
  //   const getMyChatRooms = async () => {
  //     const accToken = getCookies("accessToken");
  //     if (accToken) {
  //       const response = await getRequest(
  //         `${SERVER_URL}/message/getRooms`,
  //         accToken
  //       );
  //       console.log("response >> ", response);
  //       setMyRooms(response);
  //     }
  //   };
  // }, []);

  return (
    <ChatContext.Provider
      value={{
        setChatRoomName,
        setFindUserNick,
        chatWithUserList,
        createChatRooms,
        setClickedUser,
        myRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
