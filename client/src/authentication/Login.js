import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const {
    loginUser,
    isLoginInfo,
    updateLoginInfo,
    isLoginError,
    isLoginLoading,
    setLoading,
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
          type="text"
          onChange={(e) => {
            updateLoginInfo({ ...isLoginInfo, email: e.target.value });
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
            updateLoginInfo({ ...isLoginInfo, password: e.target.value });
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
        <button type="submit">{isLoginLoading ? "로딩중. ." : "로그인"}</button>
        {isLoginError?.error && <p>{isLoginError?.message}</p>}
      </div>
    </form>
  );
}

export default Login;
