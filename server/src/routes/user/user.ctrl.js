"use strict";

const { User, Post, Interest, Note } = require("../../models");
const UserInfo = require("../../models/UserInfo");
const jwt = require("jsonwebtoken");

// 시간데이터 폼 변경
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ko", options);
};

// 토큰으로 유저 판별
const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"].split(" ")[1];
  console.log(`SEVER_token >> ${token}`);
  const jwtkey = process.env.JWT_SECRET_KEY || "supersecretkey79938884";

  jwt.verify(token, jwtkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
    req.user = { id: decoded.userId };
    next();
  });
};

const gets = {
  recentPost: async (req, res) => {
    const userNick = req.params.userNick;
    try {
      const userInfo = await User.findOne({ where: { nick: userNick } });
      const fivePost = await Post.findAll({
        where: { UserId: userInfo.id },
        order: [["createdAt", "ASC"]],
        limit: 5,
      });

      const result = fivePost.map((post) => {
        return {
          id: post.id,
          content: post.content,
          img: post.img,
          createdAt: formatDate(post.createdAt),
          UserId: post.UserId,
        };
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  note: async (req, res) => {
    try {
      console.log("서버에 들어는 옴?");
      const userNick = req.params.userNick;
      const loggedInUserId = req.user.id;

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
        return {
          userNick: note.Sender.nick,
          userImg: note.Sender.UserInfo.imgURL,
          content: note.content,
          createdAt: formatDate(note.createdAt),
        };
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  interest: async (req, res) => {
    try {
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
      console.log(error);
      res.status(500).json(error);
    }
  },

  findUser: async (req, res) => {
    const nick = req.params.userNick;
    try {
      const User_Nick = await User.findOne({ where: { nick } });

      res.status(200).json(User_Nick);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const posts = {
  follow: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });

      if (user) {
        const targetUser = await User.findOne({
          where: { nick: req.params.userNick },
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
      console.log(error);
      res.status(500).json(error);
    }
  },
  interest: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      // 현재 사용자의 관심사에서 중복 체크
      const existingInterest = await user.getInterests({
        where: { interest: req.body.interest },
      });

      if (existingInterest.length === 0) {
        const [interest] = await Interest.findOrCreate({
          where: { interest: req.body.interest },
        });

        await user.addInterest(interest);
      }

      const userInterests = await User.findByPk(userId, {
        include: [{ model: Interest, as: "Interests" }],
      });

      res.status(200).json(userInterests.Interests);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  note: async (req, res) => {
    try {
      // 수신자 정보 조회
      const receiver = await User.findOne({
        where: { nick: req.params.userNick },
      });

      if (!receiver) {
        return res.status(404).json({ error: "수신자를 찾을 수 없습니다." });
      }

      // 내가 나한테 쪽지 보내는거 막기
      if (req.user.id === receiver.id) {
        return res
          .status(400)
          .json({ error: "자기 자신에게 쪽지를 보낼 수 없습니다." });
      }

      const newNote = await Note.create({
        content: req.body.content,
        senderId: req.user.id,
        receiverId: receiver.id,
      });

      res.status(201).json(newNote);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const deletes = {
  interest: async (req, res) => {
    try {
      // 유저ID 가져와
      const userId = req.user.id;
      // 파라메터로 관심사id가져와
      const interestId = req.params.interestId;

      // 가져온 유저 id로 유저 찾고
      const user = await User.findByPk(userId);
      // 찾은 유저에서 파라메터로 던진 interestId을 삭제한뒤
      await user.removeInterest(interestId);

      // 그 유저정보를 업뎃해줘
      const updatedUser = await User.findByPk(userId, {
        include: [{ model: Interest, as: "Interests" }],
      });

      // 그럼 관심사 정보가 업뎃되서 나올거
      res.status(200).json(updatedUser.Interests);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  note: async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const userId = req.user.id;

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
      console.log(error);
      res.status(500).json(error);
    }
  },
  unfollow: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });

      if (user) {
        const targetUser = await User.findOne({
          where: { nick: req.params.userNick },
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
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = {
  gets,
  posts,
  deletes,
};
