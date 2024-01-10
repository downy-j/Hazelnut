/* eslint-disable*/

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Mainpage from "./page/Mainpage";
import Authentication from "./authentication/Authentication";
import { useCallback, useContext, useEffect, useState } from "react";
import { loginUser, setLoading } from "./redux/slices/user";
import { SERVER_URL } from "./utile/service";
import { AuthContext } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { user, isLoading } = useContext(AuthContext);

  // useEffect(() => {
  //   const login = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_URL}/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(isLoginInfo),
  //       });

  //       if (response.ok) {
  //         const userData = await response.json();
  //         dispatch(
  //           loginUser({
  //             nick: userData.nick,
  //             token: userData.token,
  //           })
  //         );
  //         dispatch(setLoading(false));
  //       } else {
  //         console.error("Login failed");
  //         dispatch(setLoading(false));
  //       }
  //     } catch (error) {
  //       console.error("Error during login:", error);
  //     }
  //   };

  //   login();
  // }, [isLoginInfo]);

  // const user = useSelector((state) => {
  //   return state.data.user.nick;
  // });

  // const isLoading = useSelector((state) => {
  //   return state.data.user.isLoading;
  // });

  return (
    <div className="app">
      {/* {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>{user ? <Mainpage /> : <Authentication />}</>
      )} */}

      {user ? <Mainpage /> : <Authentication />}
    </div>
  );
}

export default App;
