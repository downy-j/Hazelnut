import React from "react";

function Login() {
  return (
    <>
      <h2>로그인</h2>

      <div className="inputBox">
        <input type="text" required />
        <i className="fa-regular fa-envelope"></i>
        <span>email address</span>
      </div>

      <div className="inputBox">
        <input type="password" required />
        <i className="fa-solid fa-lock"></i>
        <span>password</span>
      </div>
      <div className="inputBox">
        <input type="submit" value="로그인" />
      </div>
    </>
  );
}

export default Login;
