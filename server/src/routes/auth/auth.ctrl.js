"use strict";

const bcrypt = require("bcrypt");
const User = require("../../models/User");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const logger = require("../../log/log");

// 유저 토큰 만들기
const createToken = (id) => {
  const jwtkey = process.env.JWT_SECRET_KEY || "supersecretkey79938884";

  return jwt.sign({ id }, jwtkey, { expiresIn: "3d" });
};

const gets = {
  main: async (req, res) => {
    logger.info(`GET / 304 홈 "화면으로 이동"`);
    res.json(`GET / 304 홈 "화면으로 이동"`);
  },

  logout: (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  },
  findUser: async (req, res) => {
    const nick = req.params.userNick;
    try {
      const User_Nick = await User.findOne({ where: { nick } });

      res.status(200).json(User_Nick);
      logger.info(`GET / 304 홈 "${nick} 정보가져오기"`);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
      logger.info(`GET / 304 홈 "전체 ${users} 정보가져오기"`);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
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

      if (!user) {
        return res.status(400).json(info.message);
      }

      const token = createToken(user.id);

      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return res.status(400).json(loginError);
        }
        return res
          .status(200)
          .json({ id: user.id, nick: user.nick, email: user.email, token });
      });
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

      user = new User({ email, nick, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      const token = createToken(user.id);
      console.log(`user >> ${JSON.stringify(user)}`);

      res
        .status(200)
        .json({ id: user.id, nick: user.nick, email: user.email, token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = {
  gets,
  posts,
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
