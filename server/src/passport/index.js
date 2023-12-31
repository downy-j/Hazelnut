const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/User");

/**
 * 사용자의 식별자를 세션에 저장하고,
 * 세션에서 식별자를 기반으로 사용자 정보를 가져오는 과정을 담당함
 *
 * serializeUser : 직렬화 함수를 정의
 * user 매개변수는 인증된 사용자, done()는 직렬화 함수의 반환값
 * 반환값이 인증된 user의 id 값이라는 말
 *
 * deserializeUser : 역직렬화 함수를 정의
 * id 매개변수는 직렬화된 사용자의 id (user.id), done()은 역직렬화 함수의 반환 값
 *
 * */
module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize");
    User.findOne({
      where: { id }, // id에 해당하는 사용자를 조회해서
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => {
        console.log("user", user);
        done(null, user);
      })
      .catch((err) => done(err));
  });
  local();
};
