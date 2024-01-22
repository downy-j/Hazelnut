import React, { useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "../utile/service";
import { useDispatch } from "react-redux";
import { loginUser, setLoading } from "../redux/slices/user";

const loginRequest = async (loginInfo) => {
  try {
    const response = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      console.log("User is not logged in.");
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

function Login() {
  // ===================================
  const [psEye, setPsEye] = useState(false);
  const [isEye, setEye] = useState("fa-eye");
  const handelEye = () => {
    let password = document.getElementById("password");
    setPsEye(!psEye);
    if (psEye) {
      setEye("fa-eye");
      password.setAttribute("type", "password");
    } else {
      setEye("fa-eye-slash");
      password.setAttribute("type", "text");
    }
  };

  // 유저 info관련
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      dispatch(setLoading(true)); // 로딩 시작

      const userData = await loginRequest(loginInfo);

      if (userData) {
        dispatch(
          loginUser({
            nick: userData.nick,
            token: userData.token,
          })
        );
        localStorage.setItem("User", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      dispatch(setLoading(false)); // 로딩 종료
    }
  }, [dispatch, loginInfo]);

  return (
    <div className="form">
      <h2>로그인</h2>

      <div className="inputBox">
        <input
          type="text"
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, email: e.target.value });
          }}
          required
        />
        <i className="fa-regular fa-envelope"></i>
        <span>email address</span>
      </div>

      <div className="inputBox">
        <input
          id="password"
          type="password"
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, password: e.target.value });
          }}
          required
        />
        <i className="fa-solid fa-lock"></i>
        <span>password</span>
        <div className="toggle" onClick={handelEye}>
          <i className={`fa-regular ${isEye} eye`}></i>
        </div>
      </div>
      <div className="inputBox">
        <button onClick={handleLogin} type="submit">
          로그인
        </button>
        {/* {isLoginError?.error && <p>{isLoginError?.message}</p>} */}
      </div>
    </div>
  );
}

export default Login;
