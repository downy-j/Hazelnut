"use strict";

const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../../models/User");

const output = {
  main: (req, res) => {
    res.json("컨트롤러 만들었고 output에 있음");
  },
};

const process = {
  login: async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }

      if (!user) {
        return res.redirect(`/?error=${info.message}`);
      }
      return req.redirect(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  },
  register: async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect("/join?error=exist");
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nick,
        password: hash,
      });
      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
};

module.exports = {
  output,
  process,
};
