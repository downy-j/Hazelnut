import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Store/UserSlice";

function Login() {
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

  // state
  const [isLoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(isLoginInfo)).then((result) => {
      if (result.payload) {
        setLoginInfo("");
        navigate(`/${result.payload.nick}`);
      }
    });
  };

  return (
    <form className="form" onSubmit={loginHandler}>
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
        <button type="submit">{loading ? "생성중. ." : "계정생성"}</button>
        {error?.error && <p>{error?.message}</p>}
      </div>
    </form>
  );
}

export default Login;
