"use strict";

const { User, Chat, Message, UserInfo } = require("../../models");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// 이미지 파일을 데이터 URI로 변환하는 함수
const getDataURI = (imgPath) => {
  const imagePath = path.join(imgPath);
  const extension = path.extname(imagePath).toLowerCase();
  let mimeType = "image/jpeg";
  if (extension === ".png") {
    mimeType = "image/png";
  } else if (extension === ".gif") {
    mimeType = "image/gif";
  }
  const imageData = fs.readFileSync(imagePath);
  const base64Image = Buffer.from(imageData).toString("base64");
  return `data:${mimeType};base64,${base64Image}`;
};

const gets = {
  getRooms: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const userId = decodedToken.id;

      const rooms = await User.findByPk(userId, {
        include: {
          model: Chat,
          through: "UserChat",
          include: {
            model: User,
            attributes: ["id", "nick"],
          },
          attributes: ["id", "title"],
        },
        attributes: ["id", "nick"],
      });
      // console.log("rooms >> ", rooms);
      // console.log(`rooms >> ${JSON.stringify(rooms)}`);
      // console.log(
      //   `첫번째 체팅방의 첫번째 유저 >> ${rooms.Chats[1].Users[1].id}`
      // );

      const memberIds = rooms.Chats.map((chat) =>
        chat.Users.map((user) => user.id)
      );

      // 모든 사용자의 imgURL을 가져오기 위한 Promise 배열
      const userInfoPromises = memberIds.map((ids) =>
        Promise.all(
          ids.map(async (id) => {
            const userInfo = await UserInfo.findOne({ where: { id } });

            return userInfo ? getDataURI(userInfo.imgURL) : null;
          })
        )
      );

      // 각 사용자의 imgURL을 가져온 후 response에 추가한다
      const imgURLs = await Promise.all(userInfoPromises);

      const response = {
        roomNames: rooms.Chats.map((chat, index) => ({
          id: chat.id,
          title: chat.title,
          members: chat.Users.map((user, idx) => ({
            id: user.id,
            nick: user.nick,
            imgURL: imgURLs[index][idx], // 해당 사용자의 imgURL
          })),
        })),
      };

      res.status(200).json(response);
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
  createChat: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const roomName = req.body.chatRoomName; // 체팅방 이름
      const withUserId = req.body.clickedUser; // 초대한 유저
      const userId = decodedToken.id; // 유저 본인

      const chatRoom = await Chat.create({ title: roomName }); // 채팅방 생성
      await chatRoom.addUser(withUserId); // 초대한 유저 추가
      await chatRoom.addUser(userId); // 본인 추가
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

module.exports = {
  gets,
  posts,
};
