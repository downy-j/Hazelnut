import { createContext, useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import {
  SERVER_URL,
  getRequest,
  postRequest,
  imgPostRequest,
} from "../utile/service";
import { UserContext } from "./UserContext";

export const PostContext = createContext();

export const PostContextProvider = ({ children, user }) => {
  const { thisUser } = useContext(UserContext);

  const [isPostImage, setPostImage] = useState(null); // 사진담을 그릇
  const [preViewPost, setPreViewPost] = useState(null); // 미리보기 이미지
  const [postContent, setPostContent] = useState(null); // 작성한 글 담을 그릇

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

  // 업로드 전 사진파일 미리보기
  const postImagePreviewHandler = (e) => {
    const file = e.target.files[0];

    setPostImage(file); // 사진한장 담음,

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreViewPost(reader.result);
      };
    }
  };

  // 글 포스팅
  const uploadPost = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const accToken = getCookies("accessToken");

        const formData = new FormData();
        formData.append("postImage", isPostImage);
        formData.append("content", postContent);

        const response = imgPostRequest(
          `${SERVER_URL}/${thisUser}/post/img`,
          formData,
          accToken
        );

        if (response.error) {
          console.error("응답 싫패:", response.error);
        }
        setPreViewPost(null);
      } catch (error) {
        console.error("포스팅 실패:", error);
      }
    },
    [thisUser, postContent, isPostImage]
  );

  return (
    <PostContext.Provider
      value={{
        preViewPost,
        setPreViewPost,
        postImagePreviewHandler,
        setPostContent,
        uploadPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
