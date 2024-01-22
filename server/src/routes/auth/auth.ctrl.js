"use strict";

const bcrypt = require("bcrypt");
const User = require("../../models/User");
const UserInfo = require("../../models/UserInfo");
const validator = require("validator");
const passport = require("passport");

// const logger = require("../../log/log");
const {
  createUserToken,
  accessToken,
  refreshToken,
} = require("../../../token");

const gets = {
  main: async (req, res) => {
    try {
      // 사용자 ID 확인
      const userId = req.user ? req.user.id : null;

      if (!userId) {
        return res
          .status(304)
          .json({ message: "로그인 혹은 회원가입을 해주세요" });
      } else {
        return res.status(200).json({ message: "환영합니다" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "서버 오류" });
    }
  },

  logout: (req, res) => {
    try {
      res.cookie("accessToken", "");
      res.status(200).json("Logout Success");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  userPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        return res.status(401).json({ error: "인증되지 않은 사용자" });
      }

      const userData = await accessToken(token);
      console.log(`userData >> ${userData}`);

      if (userData.error) {
        return res
          .status(401)
          .json({ error: "Access Token이 유효하지 않습니다." });
      }

      const findUser = await User.findOne({
        where: { id: userData.id },
      });

      if (!findUser) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      // 이미 생성된 UserInfo 확인
      let loginUserInfo = await UserInfo.findOne({
        where: { UserId: findUser.id },
      });
      console.log(`loginUserInfo >> ${loginUserInfo}`);

      res.status(200).json(loginUserInfo[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "서버 오류" });
    }
  },
};

const posts = {
  login: async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return res.status(400).json(authError);
      }

      if (!user) return res.status(400).json(info.message);

      try {
        const { accessToken, refreshToken } = createUserToken(
          user.id,
          user.nick,
          user.email
        );

        res.status(200).json({
          id: user.id,
          nick: user.nick,
          email: user.email,
          token: accessToken,
          refreshToken: refreshToken,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "서버 오류" });
      }
    })(req, res, next);
  },

  register: async (req, res) => {
    try {
      const { nick, email, password } = req.body;

      let user = await User.findOne({ where: { email } });

      if (user) return res.status(400).json("이미 존재하는 사용자입니다.");

      if (!nick || !email || !password)
        return res.status(400).json("모든 입력란을 채워주세요.");

      if (!validator.isEmail(email))
        return res.status(400).json("유효한 이메일이 아닙니다.");

      if (!validator.isStrongPassword(password))
        return res
          .status(400)
          .json(
            "영문 대소문자 특수기호와 숫자를 포함한 8자 이상으로 만들어주세요"
          );

      user = new User({ nick, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      const { accessToken, refreshToken } = createUserToken(
        user.id,
        user.nick,
        user.email
      );

      await UserInfo.create({ UserId: user.id });

      res.status(200).json({
        id: user.id,
        nick: user.nick,
        email: user.email,
        token: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const patchs = {
  userPage_textBox: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken)
        return res.status(401).json({ error: "인증되지 않은 사용자" });

      const userData = await accessToken(accToken);
      if (userData.error) {
        const refToken = req.cookies.refreshToken;
        if (!refToken)
          return res.status(401).json({ error: "Refresh Token이 없습니다." });

        const newAccessTokenResult = refreshToken(refToken);
        if (newAccessTokenResult.error) {
          return res
            .status(401)
            .json({ error: "Refresh Token이 유효하지 않습니다." });
        }

        const newAccessToken = newAccessTokenResult.accessToken;
        return res
          .status(200)
          .json({ message: "새로운 Access Token 발급 성공", newAccessToken });
      }

      const loginUserId = await User.findOne({ where: { id: userData.id } });
      const textBox = req.body.textBox;

      const findUser = await UserInfo.findOne({
        where: { UserId: loginUserId },
      });
      if (!findUser) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      await findUser.update({ textBox });

      res.status(200).json({ message: "메인 대문글이 수정 되었습니다." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "서버 오류" });
    }
  },
};

module.exports = {
  gets,
  posts,
  patchs,
};

// const log = (response, url) => {
//   if (response.err) {
//     logger.error(
//       `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}`
//     );
//   } else {
//     logger.info(
//       `${url.method} ${url.path} ${url.status} Response: ${response.success} ${
//         response.message || ""
//       }`
//     );
//   }
// };
