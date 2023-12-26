/* eslint-disable*/

import "./App.css";
import Mainpage from "./page/Mainpage";
import Authentication from "./authentication/Authentication";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return <div className="app">{user ? <Mainpage /> : <Authentication />}</div>;
}

export default App;
