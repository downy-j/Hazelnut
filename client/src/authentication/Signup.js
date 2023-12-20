import React from "react";
import "./Signup.css";

function Signup() {
  return (
    <>
      <h2>회원가입</h2>
      <div className="inputBox">
        <input type="text" required />
        <i className="fa-regular fa-user"></i>
        <span>username</span>
      </div>
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
        <input type="password" required />
        <i className="fa-solid fa-lock"></i>
        <span>confirm password</span>
      </div>
      <div className="inputBox">
        <input type="submit" value="계정생성" />
      </div>
    </>
  );
}

export default Signup;
