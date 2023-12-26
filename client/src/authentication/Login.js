import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const {
    loginUser,
    isLoginError,
    isLoginInfo,
    updateLoginInfo,
    isLoginLoading,
  } = useContext(AuthContext);
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

  return (
    <form className="form" onSubmit={loginUser}>
      <h2>로그인</h2>

      <div className="inputBox">
        <input
          onChange={(e) =>
            updateLoginInfo({ ...isLoginInfo, email: e.target.value })
          }
          type="text"
          required
        />
        <i className="fa-regular fa-envelope"></i>
        <span>email address</span>
      </div>

      <div className="inputBox">
        <input
          onChange={(e) =>
            updateLoginInfo({ ...isLoginInfo, password: e.target.value })
          }
          id="password"
          type="password"
          required
        />
        <i className="fa-solid fa-lock"></i>
        <span>password</span>
        <div className="toggle" onClick={handelEye}>
          <i className={`fa-regular ${isEye} eye`}></i>
        </div>
      </div>
      <div className="inputBox">
        <input onClick={isLoginLoading} type="submit" value="로그인" />
        {isLoginError?.error && (
          <div>
            <p>{isLoginError?.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}

export default Login;
