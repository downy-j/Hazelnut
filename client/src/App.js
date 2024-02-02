/* eslint-disable*/

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Mainpage from "./page/Mainpage";
import Authentication from "./authentication/Authentication";

import { Route, Routes, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { loginUser } from "./redux/slices/user";
import AlertMessage from "./modal/AlertMessage";
import { UserContext } from "./context/UserContext";

function App() {
  const { thisUser, setThisUser, user } = useContext(UserContext);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.data.user.isLoading);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
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
    // <>{user ? <Mainpage /> : <Authentication />}</>

    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route
        path="/:userNick/*"
        element={user ? <Mainpage /> : <AlertMessage />}
      />
    </Routes>
  );
}

export default App;
