/* eslint-disable*/

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Mainpage from "./page/Mainpage";
import Authentication from "./authentication/Authentication";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser } from "./redux/slices/user";
import { AlertMessage } from "./modal/AlertMessage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.data.user.nick);

  const isLoading = useSelector((state) => state.data.user.isLoading);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading . .");
    } else {
      if (user) {
        navigate(`/${user}`);
      }
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      // localStorage에 저장된 사용자 정보가 있다면 Redux 상태에 설정
      const user = JSON.parse(storedUser);
      dispatch(loginUser(user));
    }
  }, [dispatch]);

  return (
    // <div className="app">
    //   {isLoading ? (
    //     <div className="loader-container">
    //       <div className="loader"></div>
    //     </div>
    //   ) : (
    //     <>{user ? <Mainpage /> : <Authentication />}</>
    //   )}
    // </div>

    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path={`/${user}/*`} element={<Mainpage />} />
    </Routes>
  );
}

export default App;
