import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const {
    registerUser,
    isRegisterInfo,
    updateRegisterInfo,

    isRegisterError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <form className="form" onSubmit={registerUser}>
      <h2>회원가입</h2>
      <div className="inputBox">
        <input
          onChange={(e) => {
            updateRegisterInfo({ ...isRegisterInfo, nick: e.target.value });
            console.log("이거 동작 하나요?");
          }}
          type="text"
          required
        />
        <i className="fa-regular fa-user"></i>
        <span>User Nick</span>
      </div>
      <div className="inputBox">
        <input
          onChange={(e) => {
            updateRegisterInfo({ ...isRegisterInfo, email: e.target.value });
          }}
          type="email"
          required
        />
        <i className="fa-regular fa-envelope"></i>
        <span>Email</span>
      </div>
      <div className="inputBox">
        <input
          onChange={(e) => {
            updateRegisterInfo({ ...isRegisterInfo, password: e.target.value });
          }}
          type="password"
          required
        />
        <i className="fa-solid fa-lock"></i>
        <span>Password</span>
      </div>
      <div className="inputBox">
        <input type="password" required />
        <i className="fa-solid fa-lock"></i>
        <span>Confirm Password</span>
      </div>
      <div className="inputBox">
        <input onClick={isRegisterLoading} type="submit" value="계정생성" />
        {isRegisterError?.error && (
          <div>
            <p>{isRegisterError?.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}

export default Signup;
