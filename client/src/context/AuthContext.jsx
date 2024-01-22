import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { SERVER_URL, postRequest } from "../utile/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // 유저 초기화
  const [user, setUser] = useState(null);

  // 유저 등록 관련 초기화
  const [isRegisterError, setRegisterError] = useState(null);
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const [isRegisterInfo, setRegisterInfo] = useState({
    nick: "",
    email: "",
    password: "",
  });

  // 유저 로그인 관련 초기화
  const [isLoginError, setLoginError] = useState(null);
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [isLoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  // 등록 정보를 업데이트하는 콜백 함수
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  //로그인 정보를 업데이트하는 콜백 함수
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // 등록 로직 처리
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${SERVER_URL}/register`,
        JSON.stringify(isRegisterInfo)
      );

      setRegisterLoading(false);

      if (response.error) {
        console.log(`response.error >> ${response.error}`);
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [isRegisterInfo]
  );

  // 로그인 로직 처리
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${SERVER_URL}/login`,
        JSON.stringify(isLoginInfo)
      );

      setLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [isLoginInfo]
  );

  // 로그아웃 로직 처리
  const logoutUser = useCallback(async () => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user, // 유저
        isRegisterInfo, // 등록
        updateRegisterInfo, // 등록 정도 업데이트
        registerUser, //등록기능
        isRegisterError, // 등록 에러
        isRegisterLoading, // 등록 로딩

        loginUser, // 로그인
        isLoginError, // 로그인 에러
        isLoginInfo, // 로그인 정보
        updateLoginInfo, // 로그인 정보 업데이트
        isLoginLoading, // 로그인 로딩

        logoutUser, //로그아웃
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
