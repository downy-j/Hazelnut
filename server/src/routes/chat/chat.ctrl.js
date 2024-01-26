"use strict";

const { User, Chat, Message } = require("../../models");

const gets = {
  getRooms: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        console.log(error);
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
  findChat: async (req, res) => {
    try {
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        console.log(error);
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
};

const posts = {
  createChat: async (req, res) => {},
};

module.exports = {
  gets,
  posts,
};
