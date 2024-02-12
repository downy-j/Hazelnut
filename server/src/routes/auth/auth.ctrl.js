"use strict";

const bcrypt = require("bcrypt");
const User = require("../../models/User");
const UserInfo = require("../../models/UserInfo");
const validator = require("validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// const logger = require("../../log/log");

const ensureDirectoryExists = (directory) => {
  try {
    //  폴더의 존재 여부 확인
    fs.readdirSync(directory);
  } catch (error) {
    // 에러가 발생하면(폴더가 없으면) 폴더 생성
    console.error(`${directory} 폴더가 없어 ${directory} 폴더를 생성합니다.`);
    fs.mkdirSync(directory);
  }
};

const createFolder = (userNick) => {
  try {
    // uploads 폴더 확인 및 생성
    const uploadsDir = path.join(__dirname, "..", "..", "..", "uploads");
    ensureDirectoryExists(uploadsDir);

    // /:userNick 폴더 확인 및 생성
    const userDir = path.join(uploadsDir, userNick);
    ensureDirectoryExists(userDir);

    // post 폴더 확인 및 생성
    const postDir = path.join(userDir, "post");
    ensureDirectoryExists(postDir);

    // myImage 폴더
    const myImage = path.join(userDir, "myImage");
    ensureDirectoryExists(myImage);
  } catch (error) {
    console.log("이미 개인폴더 소유중입니다");
  }
};

const gets = {
  main: async (req, res) => {
    const user = req.cookies.accessToken;
    if (!user) {
      res
        .status(200)
        .json(`Wellcom. This is Hazelnut's! Log in and enjoy the service..`);
    } else {
      res.status(200).json(`Wellcom ${user.nick}. Enjoy our service.`);
    }
  },

  logout: (req, res) => {
    try {
      res.cookie("accessToken", "");
      res.cookie("refreshToken", "");
      res.status(200).json("Logout Success");
    } catch (error) {
      res.status(500).json({ message: "에러 로그아웃 실패" });
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
        const accessToken = jwt.sign(
          {
            id: user.id,
            nick: user.nick,
            email: user.email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "24h",
            issuer: "Downy",
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user.id,
            nick: user.nick,
            email: user.email,
          },
          process.env.REFRESH_SECRET,
          {
            expiresIn: "24h",
            issuer: "Downy",
          }
        );

        // accessToken을 쿠키에 저장하기
        res.cookie("accessToken", accessToken, {
          // secure: false,
          // httpOnly: true,
        });

        // refreshToken은 서버에 저장하기
        res.cookie("refreshToken", refreshToken, {
          // secure: false,
          // httpOnly: true,
        });

        res.status(200).json({
          id: user.id,
          nick: user.nick,
          email: user.email,
          accessToken: accessToken,
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

      await UserInfo.create({ UserId: user.id });

      const accessToken = jwt.sign(
        {
          id: user.id,
          nick: user.nick,
          email: user.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "24h",
          issuer: "Downy",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
          nick: user.nick,
          email: user.email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: "24h",
          issuer: "Downy",
        }
      );

      res.cookie("accessToken", accessToken, {
        // secure: false,
        // httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        // secure: false,
        // httpOnly: true,
      });

      res.status(200).json({
        id: user.id,
        nick: user.nick,
        email: user.email,
        accessToken: accessToken,
      });

      createFolder(user.nick);
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
