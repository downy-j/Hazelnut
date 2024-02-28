"use strict";

const { User, Post, Interest, Note } = require("../../models");
const UserInfo = require("../../models/UserInfo");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// 시간데이터 폼 변경
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ko", options);
};

const gets = {
  userInfo: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const pageOwner = req.params.userNick;

      const findUser = await User.findOne({ where: { nick: pageOwner } });
      if (!findUser) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      let loginUserInfo = await UserInfo.findOne({
        where: { UserId: findUser.id },
        attributes: ["id", "imgURL", "today", "total", "textBox"],
      });

      // 이미지 파일 경로
      const imagePath = path.join(loginUserInfo.imgURL);

      // 이미지 파일의 확장자 추출
      const extension = path.extname(imagePath).toLowerCase();

      // 확장자에 따라 MIME 타입 결정
      let mimeType = "image/jpeg";
      if (extension === ".png") {
        mimeType = "image/png";
      } else if (extension === ".gif") {
        mimeType = "image/gif";
      }

      // 이미지 파일 읽기
      const imageData = fs.readFileSync(imagePath);

      // 이미지를 base64로 인코딩하여 데이터 URI 생성
      const base64Image = Buffer.from(imageData).toString("base64");
      const dataURI = `data:${mimeType};base64,${base64Image}`;

      const response = {
        id: loginUserInfo.id,
        imgURL: dataURI,
        today: loginUserInfo.today,
        total: loginUserInfo.total,
        textBox: loginUserInfo.textBox,
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

  recentPost: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const userNick = req.params.userNick;

      const userInfo = await User.findOne({ where: { nick: userNick } });
      if (!userInfo) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      const fivePost = await Post.findAll({
        where: { UserId: userInfo.id },
        order: [["createdAt", "ASC"]],
        limit: 5,
      });

      const result = fivePost.map((post) => ({
        id: post.id,
        content: post.content,
        img: post.img,
        createdAt: formatDate(post.createdAt),
        UserId: post.UserId,
      }));

      res.status(200).json(result);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },

  note: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userNick = req.params.userNick;
      const loggedInUserId = decodedToken.id;

      const user = await User.findOne({ where: { nick: userNick } });

      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      if (user.id !== loggedInUserId) {
        return res.status(403).json({ error: "권한이 없습니다." });
      }

      const receivedNotes = await Note.findAll({
        where: { receiverId: loggedInUserId },
        include: [
          {
            model: User,
            as: "Sender",
            attributes: ["nick"],
            include: [
              {
                model: UserInfo,
                attributes: ["imgURL"],
              },
            ],
          },
        ],
      });

      const result = receivedNotes.map((note) => {
        const imagePath = note.Sender.UserInfo.imgURL;

        const extension = path.extname(imagePath).toLowerCase();

        let mimeType = "image/jpeg";
        if (extension === ".png") {
          mimeType = "image/png";
        } else if (extension === ".gif") {
          mimeType = "image/gif";
        }

        // 이미지 파일 읽기
        const imageData = fs.readFileSync(imagePath);

        // 이미지를 base64로 인코딩하여 데이터 URI 생성
        const base64Image = Buffer.from(imageData).toString("base64");
        const dataURI = `data:${mimeType};base64,${base64Image}`;

        return {
          id: note.id,
          sender: note.Sender.nick,
          userImg: dataURI,
          content: note.content,
          createdAt: formatDate(note.createdAt),
        };
      });

      res.status(200).json(result);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },

  interest: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userNick = req.params.userNick;

      const user = await User.findOne({
        where: { nick: userNick },
        include: [{ model: Interest, as: "Interests" }],
      });

      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      res.status(200).json(user.Interests);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },

  findUser: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const nick = req.params.userNick;
      const userWithInfo = await User.findAll({
        where: { nick },
        include: [
          {
            model: UserInfo,
            attributes: ["imgURL", "textBox"],
          },
        ],
        attributes: ["id", "nick", "email"],
      });

      if (!userWithInfo) {
        return res
          .status(404)
          .json({ error: "해당 닉네임을 가진 사용자를 찾을 수 없습니다." });
      }

      res.status(200).json(userWithInfo);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },

  getUsers: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
};

const posts = {
  follow: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const user = await User.findOne({ where: { id: decodedToken.id } });

      const userNick = req.params.userNick;

      if (user) {
        const targetUser = await User.findOne({
          where: { nick: userNick },
        });

        if (!targetUser) {
          return res
            .status(400)
            .json("해당 닉네임을 가진 유저를 찾을 수 없습니다.");
        }

        const isAlreadyFollowing = await user.hasFollowing(targetUser.id);
        if (isAlreadyFollowing) {
          return res.status(400).json("이미 팔로우한 유저입니다.");
        }

        await user.addFollowing(targetUser);

        return res
          .status(200)
          .json(`${user.nick}님이 ${targetUser.nick}님을 팔로우합니다`);
      } else {
        return res.status(400).json("No user");
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
  interest: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userId = decodedToken.id;
      const user = await User.findByPk(userId);
      const userInterest = req.body.interest;

      // 현재 사용자의 관심사에서 중복 체크
      const existingInterest = await user.getInterests({
        where: { interest: userInterest },
      });

      if (existingInterest.length === 0) {
        const [interest] = await Interest.findOrCreate({
          where: { interest: userInterest },
        });

        await user.addInterest(interest);
      }

      const userInterests = await User.findByPk(userId, {
        include: [{ model: Interest, as: "Interests" }],
      });

      res.status(200).json(userInterests.Interests);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
  note: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userNick = req.params.userNick;

      const receiver = await User.findOne({
        where: { nick: userNick },
      });

      if (!receiver) {
        return res.status(404).json({ error: "수신자를 찾을 수 없습니다." });
      }

      if (decodedToken.id === receiver.id) {
        return res
          .status(400)
          .json({ error: "자기 자신에게 쪽지를 보낼 수 없습니다." });
      }

      const newNote = await Note.create({
        content: req.body.content,
        senderId: decodedToken.id,
        receiverId: receiver.id,
      });

      res.status(201).json(newNote);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
};

const patchs = {
  updateOnLineID: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const textBox = req.body.textBox;

      const findUser = await UserInfo.findOne({
        where: { UserId: decodedToken.id },
      });
      if (!findUser) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      await findUser.update({ textBox });

      res.status(200).json(textBox);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },

  myProFileImage: async (req, res) => {
    try {
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userNick = req.params.userNick;

      const findUser = await User.findOne({
        where: { nick: userNick },
      });

      if (!findUser) {
        return res.status(404).json({ error: "유저를 찾을 수 없습니다." });
      }

      let userInfo = await UserInfo.findOne({
        where: { UserId: findUser.id },
      });

      // 해당 파라메터와 로그인한 사람이 동일 인물일때만 DB에 값 넣을거
      if (findUser.id === decodedToken.id) {
        // 이미지 정보를 DB에 저장
        const imagePath = req.file.path;

        await userInfo.update({ imgURL: imagePath });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
};

const deletes = {
  interest: async (req, res) => {
    try {
      console.log("진입함?");
      const accToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userId = decodedToken.id;
      const interestId = req.params.interestId;

      const user = await User.findByPk(userId);

      await user.removeInterest(interestId);

      const updatedUser = await User.findByPk(userId, {
        include: [{ model: Interest, as: "Interests" }],
      });

      res.status(200).json(updatedUser.Interests);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
  note: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userId = decodedToken.id;
      const noteId = req.params.noteId;

      const deletedNote = await Note.destroy({
        where: {
          id: noteId,
          receiverId: userId,
        },
      });

      if (deletedNote) {
        res.status(204).json("성공적으로 삭제됬습니다.");
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
  unfollow: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const user = await User.findOne({ where: { id: decodedToken.id } });
      const userNick = req.params.userNick;

      if (user) {
        const targetUser = await User.findOne({
          where: { nick: userNick },
        });

        if (!targetUser) {
          return res
            .status(400)
            .json("해당 닉네임을 가진 유저를 찾을 수 없습니다.");
        }

        const isAlreadyFollowing = await user.hasFollowing(targetUser.id);
        if (!isAlreadyFollowing) {
          return res.status(400).json("이미 언팔로우한 유저입니다.");
        }

        await user.removeFollowing(targetUser.id);

        return res
          .status(200)
          .json(`${user.nick}님이 ${targetUser.nick}님을 언팔로우합니다`);
      } else {
        return res.status(400).json("유저가 없습니다");
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
        });
      } else {
        res.status(500).json({ error: "서버 오류" });
      }
    }
  },
};

module.exports = {
  gets,
  posts,
  patchs,
  deletes,
};
