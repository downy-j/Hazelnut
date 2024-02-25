import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { SERVER_URL, getRequest, postRequest } from "../utile/service";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        JSON.stringify(isRegisterInfo),
        null,
        "application/json"
      );

      setRegisterLoading(false);

      if (response.error) {
        console.log(`response.error >> ${response.error}`);
        return setRegisterError(response);
      }

      if (response) {
        dispatch(
          loginUser({
            id: response.id,
            nick: response.nick,
            email: response.email,
          })
        );

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        navigate(`/${response.nick}`);
      }
    },
    [dispatch, navigate, isRegisterInfo]
  );

  // 로그인 로직 처리
  const userLogin = useCallback(
    async (e) => {
      e.preventDefault();

      setLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${SERVER_URL}/login`,
        JSON.stringify(isLoginInfo),
        null,
        "application/json"
      );

      setLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      if (response) {
        dispatch(
          loginUser({
            id: response.id,
            nick: response.nick,
            email: response.email,
          })
        );

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        navigate(`/${response.nick}`);
      }
    },
    [dispatch, navigate, isLoginInfo]
  );

  // 로그아웃 로직 처리
  const userLogout = useCallback(async () => {
    try {
      // 스토리지에서 유저 정보 제거
      localStorage.removeItem("User");

      // 리듀서에서 유저 정보 제거
      dispatch(logoutUser());

      // 토큰 제거
      await postRequest(`${SERVER_URL}/logout`);

      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        user, // 유저
        isRegisterInfo, // 등록
        updateRegisterInfo, // 등록 정도 업데이트
        registerUser, //등록기능
        isRegisterError, // 등록 에러
        isRegisterLoading, // 등록 로딩

        userLogin, // 로그인
        isLoginError, // 로그인 에러
        isLoginInfo, // 로그인 정보
        updateLoginInfo, // 로그인 정보 업데이트
        isLoginLoading, // 로그인 로딩

        userLogout, //로그아웃
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
