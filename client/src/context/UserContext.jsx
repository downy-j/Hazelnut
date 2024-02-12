/* eslint-disable*/

import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";
import {
  SERVER_URL,
  getRequest,
  patchRequest,
  postRequest,
  deleteRequest,
  imgPostRequest,
  accessToken,
  refreshToken,
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

  // 내프로필 URL, 내프로필 Name
  const [myProfileImageURL, setMyProfileImageURL] = useState(null); // 서버에서 받은 url
  const [myProfileImageName, setMyProfileImageName] = useState(""); // 정제된 파일명
  const [isImage, setImage] = useState(null); //
  const [preViewBox, setPreViewBox] = useState(null);

  //
  const [isTextBox, setTextBox] = useState(null);
  const [updateText, setUpdateText] = useState("");

  // 최신글 불러오기
  const [isRecentPosts, setRecentPosts] = useState([]);

  // 관신사 불러오기, 관심사 추가하기
  const [indexOfInterest, setIndexOfInterest] = useState(null); // item id 담기

  const [addInterest, setAddInterest] = useState(""); // 입력값을 담을 상태
  const [isInterests, setInterests] = useState([]); // 서버 응답을 담을 배열 상태

  // 쪽지 불러오기, 쪽지 보내기
  const [sendNote, setSendNote] = useState(""); // 입력값을 담을 상태
  const [isNotes, setNotes] = useState([]); // 서버 응답을 담을 배열 상태

  // 유저찾기
  const [searchUserValue, setSearchUserValue] = useState(""); // 입력값을 담을 상태
  const [searchUserResults, setSearchUserResults] = useState([]); // 서버 응답을 담을 배열 상태

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

  // 내 프로필사진 데이터 정제와 프리뷰
  const myProfilePreview = (e) => {
    const file = e.target.files[0];

    setImage(file); // 사진한장 담음

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreViewBox(reader.result);
      };
    }
  };

  // 내 프로필 사진 등록
  const myProfileImage = async () => {
    try {
      const accToken = getCookies("accessToken");

      const formData = new FormData();
      formData.append("image", isImage);
      formData.append("fileName", myProfileImageName);

      const response = await imgPostRequest(
        `${SERVER_URL}/${thisUser}/profileImage`,
        formData,
        accToken
      );

      console.log(`response >> ${JSON.stringify(response)}`);
    } catch (error) {
      console.error("유저 프로필 사진 가져오는데 실패했습니다:", error);
    }
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
          const replaceImage = myImage.replace(/\\/g, "/");
          console.log(`replaceImage >> ${replaceImage}`);
          setMyProfileImageURL(myImage);

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

  // note (get)
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

  // interest(get)
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

  // interest(post)
  const addMyInterest = useCallback(
    async (e) => {
      e.preventDefault();

      const accToken = getCookies("accessToken");
      const response = postRequest(
        `${SERVER_URL}/interest`,
        { interest: addInterest },
        accToken
      );
      console.log(`response >> ${JSON.stringify(response)}`);

      if (response.error) {
        console.error(response);
      }
    },
    [addInterest]
  );

  // interest(delete)
  useEffect(() => {
    if (indexOfInterest) {
      const accToken = getCookies("accessToken");
      deleteRequest(`${SERVER_URL}/interest/${indexOfInterest}`, accToken);
    }
  }, [indexOfInterest]);

  // follow(post, delete)

  // findUser
  const findUserCB = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const accToken = getCookies("accessToken");
        const response = await getRequest(
          `${SERVER_URL}/${searchUserValue}/find`,
          accToken
        );

        if (response.error) {
          setErrorMessage(response.error);
        } else {
          setSearchUserResults(response);
        }
      } catch (error) {
        console.error("Error occurred while fetching user:", error);
      }
    },
    [searchUserValue]
  );
  // getUsers

  return (
    <UserContext.Provider
      value={{
        user,
        isRecentPosts,
        isErrorMessage,

        isTodays,
        isTotals,
        isTextBox,
        myProfilePreview,
        preViewBox,
        myProfileImage,
        myProfileImageURL,

        updateOnLineID,
        setUpdateText,
        updateText,

        isInterests,
        setIndexOfInterest,
        addMyInterest,
        setAddInterest,

        isNotes,

        setThisUser,
        thisUser,

        // 유저 검색
        findUserCB,
        setSearchUserValue,
        searchUserValue,
        searchUserResults,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
