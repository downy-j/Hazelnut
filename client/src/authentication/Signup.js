import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Store/UserSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [isRegisterInfo, setRegisterInfo] = useState({
    nick: "",
    email: "",
    password: "",
  });
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // 회원등록
  const registeHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(isRegisterInfo)).then((result) => {
      if (result.payload) {
        setRegisterInfo("");
        navigate(`/${result.payload.nick}`);
      }
    });
  };

  // const registerUser = useCallback(
  //   async (e) => {
  //     e.preventDefault();

  //     setRegisterLoading(true);
  //     setRegisterError(null);

  //     const response = await postRequest(
  //       `${SERVER_URL}/register`,
  //       JSON.stringify(isRegisterInfo),
  //       null,
  //       "application/json"
  //     );

  //     setRegisterLoading(false);

  //     if (response.error) {
  //       console.log(`response.error >> ${response.error}`);
  //       return setRegisterError(response);
  //     }

  //     if (response) {
  //       dispatch(
  //         loginUser({
  //           id: response.id,
  //           nick: response.nick,
  //           email: response.email,
  //         })
  //       );

  //       localStorage.setItem("User", JSON.stringify(response));
  //       // setUser(response);
  //       navigate(`/${response.nick}`);
  //     }
  //   },
  //   [dispatch, navigate, isRegisterInfo]
  // );

  return (
    <form className="form" onSubmit={registeHandler}>
      <h2>회원가입</h2>
      <div className="inputBox">
        <input
          onChange={(e) => {
            updateRegisterInfo({ ...isRegisterInfo, nick: e.target.value });
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
        <button type="submit">{loading ? "생성중. ." : "계정생성"}</button>
        {error?.error && <p>{error?.message}</p>}
      </div>
    </form>
  );
}

export default Signup;
