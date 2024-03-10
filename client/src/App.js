/* eslint-disable*/

import "./App.css";
import socket from "./server";

import { useDispatch, useSelector } from "react-redux";
import Mainpage from "./page/Mainpage";
import Authentication from "./authentication/Authentication";

import { Route, Routes, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "./Store/UserSlice";
import AlertMessage from "./modal/AlertMessage";
import Message from "./page/Message";
import { getCookies } from "./utile/service";

function App() {
  const user = useSelector((state) => state.user.nick);

  const dispatch = useDispatch();

  useEffect(() => {
    const accToken = getCookies("accessToken");

    if (accToken) {
      dispatch(getUserData(accToken));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route
        path="/:userNick/*"
        element={user ? <Mainpage /> : <AlertMessage />}
      />
      <Route path="/message" element={<Message />} />
    </Routes>
  );
}

export default App;
