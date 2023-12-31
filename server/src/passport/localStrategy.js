const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/User");
/**
 * email 필드의 값을 사용해 User 모델에서 사용자 정보를 조회
 * password 필드의 값을 사용하여 사용자 비번확인
 * 비번이 일치하면 인증 성공
 * 비번이 불일치하면 인증 실패
 * */
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // 로그인 ID필드의 이름을 지정
        passwordField: "password", // 로그인 비밀번호 필드의 이름을 지정
        passReqToCallback: false, // 콜백 함수에 요청 객체를 전달할지 여부를 지정
      },
      async (email, password, done) => {
        // 이게 검증하는 LocalStrategy의 콜백 함수, done는 콜백 함수의 반환 값
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser); // 인증이 성공
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." }); // 인증이 실패
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." }); // 인증이 실패
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
