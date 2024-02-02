/* eslint-disable*/

import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";
import {
  SERVER_URL,
  postRequest,
  accessToken,
  refreshToken,
  getRequest,
  patchRequest,
} from "../utile/service";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const user = useSelector((state) => state.data.user.nick) || null; // 로그인 유저
  const [thisUser, setThisUser] = useState(null);

  const [isErrorMessage, setErrorMessage] = useState("");

  //
  const [isTodays, setTodays] = useState("");
  const [isTotals, setTotals] = useState("");

  //
  const [isImageURL, setImageURL] = useState("");
  const [updateImageURL, setUpdateImageURL] = useState("");

  //
  const [isTextBox, setTextBox] = useState(null);
  const [updateText, setUpdateText] = useState("");

  // 최신글 불러오기
  const [isRecentPosts, setRecentPosts] = useState([]);

  // 관신사 불러오기, 관심사 추가하기
  const [isInterests, setInterests] = useState([]);
  const [addInterest, setAddInterest] = useState("");

  // 쪽지 불러오기, 쪽지 보내기
  const [isNotes, setNotes] = useState([]);
  const [sendNote, setSendNote] = useState("");

  // 쿠키 가져오기
  const getCookies = (name) => {
    const cookies = document.cookie;
    const cookieArray = cookies.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + "=")) {
        const cookieValue = cookie.substring(name.length + 1);
        return cookieValue;
      }
    }
    return null;
  };

  // userInfo 로직( get, patch )
  useEffect(() => {
    const userInfos = async () => {
      const accToken = getCookies("accessToken");
      try {
        if (thisUser) {
          const response = await getRequest(
            `${SERVER_URL}/${thisUser}`,
            accToken
          );

          const todays = JSON.stringify(response.today);
          setTodays(todays);

          const totals = JSON.stringify(response.total);
          setTotals(totals);

          const myImage = JSON.stringify(response.imgURL);
          setImageURL(myImage);

          const textBox = JSON.stringify(response.textBox);
          setTextBox(textBox);
        }
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다:", error);
        setErrorMessage("유저 정보를 가져오는데 실패했습니다");
      }
    };
    userInfos();
  }, [thisUser]);

  // 대화명 바꾸기
  const updateOnLineID = useCallback(
    async (e) => {
      e.preventDefault();

      const accToken = getCookies("accessToken");

      const response = await patchRequest(
        `${SERVER_URL}/update/userInfo/textBox`,
        { textBox: updateText },
        accToken
      );

      if (response.error) {
        return setRegisterError(response);
      }
      setTextBox(response);
    },
    [updateText]
  );

  // recentPost( get )
  useEffect(() => {
    const getRecentPost = async () => {
      const accToken = getCookies("accessToken");
      try {
        if (thisUser) {
          const response = await getRequest(
            `${SERVER_URL}/${thisUser}/recentPost`,
            accToken
          );

          if (response.error) {
            console.error(
              "최신 게시물을 가져오는 중 에러 발생:",
              response.error
            );
          } else {
            setRecentPosts(response);
          }
        }
      } catch (error) {
        console.error("최신 게시물을 가져오는 중 에러 발생:", error);
      }
    };
    getRecentPost();
  }, [thisUser]);

  // note (get, post, delete)
  useEffect(() => {
    const getNotes = async () => {
      const accToken = getCookies("accessToken");
      try {
        if (thisUser) {
          const response = await getRequest(
            `${SERVER_URL}/${thisUser}/notes`,
            accToken
          );

          if (response.error) {
            console.error("유저의 쪽지를 불러오는데 에러 발생", response.error);
          } else {
            setNotes(response);
          }
        }
      } catch (error) {
        console.error("쪽지를 불러올수 없습니다.:", error);
      }
    };

    getNotes();
  }, [thisUser]);

  // interest(get, post, delete)
  useEffect(() => {
    const getInterests = async () => {
      const accToken = getCookies("accessToken");
      try {
        if (thisUser) {
          const response = await getRequest(
            `${SERVER_URL}/${thisUser}/interest`,
            accToken
          );

          if (response.error) {
            console.error(
              "유저의 관심사를 가져오는 중 에러 발생:",
              response.error
            );
          } else {
            setInterests(response);
          }
        }
      } catch (error) {
        console.error("관심사를 가져올수 없습니다. :", error);
      }
    };
    getInterests();
  }, [thisUser]);

  // follow(post, delete)
  // findUser
  // getUsers

  return (
    <UserContext.Provider
      value={{
        user,
        isRecentPosts,
        isErrorMessage,

        isTodays,
        isTotals,
        isImageURL,
        isTextBox,

        updateOnLineID,
        setUpdateText,
        updateText,

        isInterests,

        isNotes,

        setThisUser,
        thisUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
