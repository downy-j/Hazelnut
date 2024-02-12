import { createContext, useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { SERVER_URL, getRequest, postRequest } from "../utile/service";
import { UserContext } from "./UserContext";

export const PostContext = createContext();

export const PostContextProvider = ({ children, user }) => {
  const { thisUser } = useContext(UserContext);
  const [imgSRC, setImgSRC] = useState(null); // 내가 업로드할 사진 파일 미리보기

  const [selectedFile, setSelectedFile] = useState(null); // 미리보기 이미지

  const [imageURL, setImageURL] = useState(null); // 이미지 URL 들어갈거임
  const [imageName, setImageName] = useState(""); // 이미지명 들어갈거임
  const [postContent, setPostContent] = useState(null); // 작성한 글 담을 그릇
  const [postImg, setPostImg] = useState(null); // 사진담을 그릇

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

  // 포스팅 관련 초기화

  // 사진 가져오기, 글도 가져오기
  // useEffect(() => {
  //   const bringItPostImgAll = async () => {
  //     const accToken = getCookies("accessToken");

  //     try {
  //       const response = await getRequest(
  //         `${SERVER_URL}/${thisUser}/posts`,
  //         accToken
  //       );

  //       if (response.error) {
  //         console.error("사진 가져오기 에러", response.error);
  //       }
  //       setImageURL(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   bringItPostImgAll();
  // }, [thisUser]);

  // 사진 업로드, 글도 업로드
  // const uploadItPostImg = useCallback();

  // postHandler

  // 업로드 전 사진파일 미리보기용
  const fileHandler = (e) => {
    const { nick } = JSON.parse(localStorage.getItem("User"));
    const nowDate = new Date().toISOString().slice(0, 10);
    const file = e.target.files[0];
    const fileName = (file || {}).name || "";
    const result = fileName.slice(0, fileName.lastIndexOf(".")) || "noFileName";

    // 이거 출력되면 담아서 서버에보낼 파일명될놈임
    setSelectedFile(`${nick}_${result}_${nowDate}`);

    // 여기서 미리보기할 파일을 담음
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgSRC(reader.result);
      };
    }
  };

  const submitPostData = () => {
    // 사진파일 저장할 명 정제 됬음 이건 img로 들어가면 됨
    // 게시글 내용 작성도 문제 없음 onChange써서 보내면 됨
    // 로그인은 했으니 그냥 보내면 id값이랑 같이 갈거같음
    // 그럼 이제 postContext를 손대야 겠음
  };

  return (
    <PostContext.Provider
      value={{
        selectedFile,
        imgSRC,
        fileHandler,
        submitPostData,
        setPostContent,

        // posting,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
