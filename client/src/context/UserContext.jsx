import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";
import {
  SERVER_URL,
  postRequest,
  getRequest,
  getRequestWithHeaders,
  patchRequest,
} from "../utile/service";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isRecentPosts, setRecentPosts] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const userNick = useSelector((state) => state.data.user.nick) || null;

  // DB에서 갖고옴
  const [isTodays, setTodays] = useState("");
  const [isTotals, setTotals] = useState("");
  const [isImageURL, setImageURL] = useState("");
  const [isTextBox, setTextBox] = useState("");

  // DB에 데이터 수정을 위해 담을 그릇
  const [isText, setText] = useState("");

  const [isInterests, setInterests] = useState([]);

  const [isNotes, setNotes] = useState([]);

  // 쿠키 가져오기
  const getCookies = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        setAccessToken(cookieValue);
      }
    }
    return null;
  };

  // userInfo 로직( get, patch )
  useEffect(() => {
    const userInfos = async () => {
      const accToken = getCookies("accessToken");
      try {
        if (accToken.error) {
        } else {
          if (userNick) {
            const response = await getRequest(`${SERVER_URL}/${userNick}`);

            const todays = JSON.stringify(response.today);
            setTodays(todays);

            const totals = JSON.stringify(response.total);
            setTotals(totals);

            const myImage = JSON.stringify(response.imgURL);
            setImageURL(myImage);

            const textBox = JSON.stringify(response.textBox);
            setTextBox(textBox);
          }
        }
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다:", error);
      }
    };
    userInfos();
  }, [userNick]);

  const updateTextBox = async (updatedValue) => {
    try {
      const response = await patchRequest(
        `${SERVER_URL}/update/userInfo/textBox`,
        { textBox: updatedValue }
      );
      setTextBox(response);
    } catch (error) {
      console.error(error);
    }
  };

  // recentPost( get )
  useEffect(() => {
    const getRecentPost = async () => {
      try {
        if (userNick) {
          const response = await getRequest(
            `${SERVER_URL}/${userNick}/recentPost`
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
  }, [userNick]);

  // note (get, post, delete)
  useEffect(() => {
    const getNotes = async () => {
      try {
        if (userNick) {
          getCookies("accessToken");
          const response = await getRequestWithHeaders(
            `${SERVER_URL}/${userNick}/notes`
          );

          if (response.error) {
            console.error("유저의 쪽지를 불러오는데 에러 발생", response.error);
          } else {
            setNotes(response);
          }
        }
      } catch (error) {
        console.error(" 쪽지를 불러올수 없습니다.:", error);
      }
    };
    getNotes();
  }, [isNotes]);

  // interest(get, post, delete)
  useEffect(() => {
    const getInterests = async () => {
      try {
        if (userNick) {
          const response = await getRequest(
            `${SERVER_URL}/${userNick}/interest`
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
  }, [userNick]);

  // follow(post, delete)
  // findUser
  // getUsers

  return (
    <UserContext.Provider
      value={{
        userNick,
        isRecentPosts,

        isTodays,
        isTotals,
        isImageURL,
        isTextBox,
        updateTextBox,

        setText,
        isText,

        isInterests,

        isNotes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
