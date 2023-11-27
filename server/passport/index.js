const passport = require("passport");
const local = require("./localStrategy"); // 로컬서버로 로그인
const userModel = require("../Models/userModel");

module.exports = () => {
  /*
   * 직렬화(Serialization) : 객체를 직렬화하여 전송 가능한 형태로 만드는 것.
   * 역직렬화(Deserialization) : 직렬화된 파일 등을 역으로 직렬화하여 다시 객체의 형태로 만드는 것.
   */
  passport.serializeUser((user, done) => {
    console.log("===== Serialize =====");
    done(null, user._id);
    // req.session객체에 어떤 데이터를 저장할 지 선택
    // user._id만을 세션객체에 넣음
    // 딱 유저 _id 값만 저장. 데이터를 deserializeUser로 전달
    // 세션에는 { _id: 3, 'connect.sid' : s%23842309482 } 가 저장됨
  });

  passport.deserializeUser((id, done) => {
    console.log("===== deserialize =====");
    userModel
      .findOne({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
