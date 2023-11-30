/* eslint-disable*/

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const Login = (props) => {
  const pwToggle = () => {
    let password = document.getElementById("password");
    let togglePassword = document.getElementById("toggle");
    if (password.type === "password") {
      password.setAttribute("type", "text");
      togglePassword.classList.add("hide");
    } else {
      password.setAttribute("type", "password");
      togglePassword.classList.remove("hide");
    }
  };

  return (
    <>
      <div
        className="loginContainer df-jcc-aic"
        style={{ background: "beige" }}
      >
        <div className="loginBox">
          <div className="loginLeftBox P-15">
            <img src={"https://placehold.co/250x539/"} />
          </div>

          <div className="loginRightBox P-15">
            <div className="brandLoginSocial_crad mb-10 ">
              <div className="brandName df-jcc-aic P-10 mb-10">
                <Link to="/">
                  <h3>Hazelnut</h3>
                </Link>
              </div>

              <form className="loginForm P-10 mb-10">
                <div className="emailBox P-5">
                  <input type="text" required id="email" />
                  <span>Email</span>
                </div>

                <div className="pwBox P-5 mb-10">
                  <input type="password" required id="password" />
                  <span>password</span>
                  <div
                    id="toggle"
                    onClick={() => {
                      pwToggle();
                    }}
                  ></div>
                </div>
                <Link
                  onClick={() => {
                    props.setUser(true);
                  }}
                  to="/"
                  className="loginBtn mt_5 df-jcc-aic"
                >
                  <span>로그인</span>
                  <div className="wave"></div>
                </Link>
              </form>

              <div className="socialBox mb-10">
                <div className="socials df-jcc-aic Pt-10">
                  <Link className="socialLink naver P-5" to="#">
                    <img
                      src={process.env.PUBLIC_URL + "./img/home/naverBtn.png"}
                    />
                  </Link>
                  <Link className="socialLink kakao P-5" to="#">
                    <img
                      src={process.env.PUBLIC_URL + "./img/home/kakaoBtn.png"}
                    />
                  </Link>
                  <Link className="socialLink google P-5" to="#">
                    <img
                      src={process.env.PUBLIC_URL + "./img/home/btn_google.svg"}
                    />
                  </Link>
                </div>
                <span className="findPwBox">
                  <Link className="findPw df-jcc Pt-10" to="#">
                    비밀번호를 잊어버리셨나요?
                  </Link>
                </span>
              </div>
            </div>

            <div className="produceBox mb-10">
              <p className="df-jcc Pt-10">
                계정이 없으신가요?
                <Link className="ml-5" to="/registPage">
                  가입하기
                </Link>
              </p>
            </div>

            <div className="appDownloads mb-10">
              <p className="df-jcc Pt-10">앱 다운로드 하세요</p>
              <Link to="#">
                <img src="https://placehold.co/134x40" />
              </Link>
              <Link to="#">
                <img src="https://placehold.co/134x40" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
