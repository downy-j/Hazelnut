"use strict";

const bcrypt = require("bcrypt");
const User = require("../../models/User");
const validator = require("validator");

const output = {
  main: (req, res) => {
    res.json("로그인 성공 메인화면 진입");
  },
  logout: (req, res) => {
    res.json("로그아웃 성공");
    res.redirect("/login");
  },
  login: (req, res) => {
    res.json("로그인 화면입니다 로그인 하세요.");
  },
  register: (req, res) => {
    res.json("회원가입 화면 입니다 가입하세요.");
  },
};

const process = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ where: { email } });

      if (!user) return res.status(400).json("존재하지 않는 사용자입니다.");

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return res.status(400).json("비밀번호가 일치하지 않습니다.");

      res.status(200).json({ id: user.id, email, nick: user.nick });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
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

      res.status(200).json({ id: user.id, email, nick: user.nick });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = {
  output,
  process,
};
