import { useCallback } from "react";
import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  console.log("messages", messages);

  useEffect(() => {
    // 서버에서 사용자 정보 가져오기
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log(
          "사용자 정보를 가져오는 중에 오류가 발생했습니다.",
          response
        );
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats); // 받아온 사용자 정보를 상태에 저장
    };

    getUsers();
  }, [userChats]);

  // 유저 차트 가져오기
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  // http 요청해서 메시지 가져오는 방법
  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  // 현재 차트 업데이트
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  // 채팅 만들기
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log("채팅 생성중 오류가 발생 했습니다.", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
