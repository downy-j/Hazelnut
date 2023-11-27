/* eslint-disable*/

import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// 컴포넌트

// 페이지
import Login from "./pages/Login";
import Main from "./pages/Main";
import Regiest from "./pages/Regiest";

function App() {
  let [user, setUser] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Main />}></Route>
        <Route path="/registPage" element={<Regiest />}></Route>
      </Routes>
    </>
  );
}

export default App;
