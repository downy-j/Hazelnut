import { createContext, useState } from "react";
import { useCallback } from "react";
import { SERVER_URL, postRequest } from "../utile/service";

export const PostContext = createContext();

export const PostContextProvider = ({ children, user }) => {
  const [selectedFile, setSelectedFile] = useState(null); // 서버로 갈거다
  const [imgSRC, setImgSRC] = useState(null); // img src에 들어감

  // 포스팅 관련 초기화
  const [isPostError, setPostError] = useState(null);
  const [isPostLoading, setPostLoading] = useState(false);
  const [isPostInfo, setPostInfo] = useState({
    content: "",
    img: "",
    UserId: "",
  });

  // 포스팅 정보를 업데이트 하는 콜백 함수
  const updatePostInfo = useCallback((info) => {
    setPostInfo(info);
  }, []);

  // 포스팅 로직 처리
  const posting = useCallback(
    async (e) => {
      e.preventDefault();

      setPostLoading(true);
      setPostError(null);

      const response = await postRequest(
        `${SERVER_URL}/post`,
        JSON.stringify(isPostInfo)
      );
      console.log("3번");

      setPostLoading(false);

      if (response.error) {
        console.log("4번");
        return setPostError(response);
      }
      console.log("5번");
    },
    [isPostInfo]
  );

  /**
   * nick : 로그인한 유저의 nick
   * date : 현재날짜
   * file : 파일정보
   * fileName : 파일명.확장자
   * result : 파일명
   * reader.result : 선택한 파일 미리보기위한 경로
   */
  const fileHandler = (e) => {
    const { nick } = JSON.parse(localStorage.getItem("User"));
    const date = new Date().toISOString().slice(0, 10);
    const file = e.target.files[0];
    const fileName = (file || {}).name || "";
    const result = fileName.slice(0, fileName.lastIndexOf(".")) || "noFileName";

    setSelectedFile(`${nick}_${result}_${date}`);

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgSRC(reader.result);
      };
    }
    console.log(
      `${nick} || ${date} || ${file} || ${fileName} || ${result} || ${imgSRC}`
    );
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

        posting,
        isPostError,
        isPostInfo,
        updatePostInfo,
        isPostLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
