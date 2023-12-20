import React, { useState } from "react";
import "./Authentication.css";
import Login from "./Login";
import Signup from "./Signup";

function Authentication() {
  const [active, setActive] = useState("login");
  const handleChange = () => {
    setActive(active === "login" ? "signup" : "login");
  };
  return (
    <div className="auth__body df_jcc_aic">
      <h3 className="logo__Text">Hazelnuts</h3>
      <div className="auth__container">
        <div className="from">
          {active === "login" ? <Login /> : <Signup />}
          <p>
            {active === "login" ? (
              <>
                이미 계정이 있으신가요 ?
                <button onClick={handleChange}>Log in</button>
              </>
            ) : (
              <>
                계정이 없으신가요 ?
                <button onClick={handleChange}>Create an account</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;