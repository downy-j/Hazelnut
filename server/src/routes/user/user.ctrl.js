"use strict";

const { User, Post, Interest, Note } = require("../../models");

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
      res.status(200).json(fivePost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  note: async (req, res) => {
    try {
      // 로그인한 현재 유저id를 넣어서

      // 현재 사용자가 받은 쪽지 목록 조회
      const receivedNotes = await Note.findAll({
        where: { receiverId: req.user.id },
      });
      console.log(`receivedNotes >> ${receivedNotes}`);

      res.status(200).json(receivedNotes);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  interest: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId, {
        include: [{ model: Interest, as: "Interests" }],
      });

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
        const targetUserId = parseInt(req.params.userId, 10);

        const isAlreadyFollowing = await user.hasFollowing(targetUserId);
        if (isAlreadyFollowing) {
          return res.status(400).json("이미 팔로우한 유저입니다.");
        }

        await user.addFollowing(targetUserId);

        return res.status(200).json(`${user.nick}님이 팔로우합니다`);
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
      //쪽지 생성
      console.log(`로그인한 유저 >> ${req.user.id}`);
      console.log(`페이지주인 >> ${req.params.userId}`);

      const newNote = await Note.create({
        content: req.body.content,
        senderId: req.user.id,
        receiverId: req.params.userId,
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
      console.log(`user >> ${user}`);

      if (user) {
        const targetUserId = parseInt(req.params.userId, 10);

        const isAlreadyFollowing = await user.hasFollowing(targetUserId);
        if (!isAlreadyFollowing) {
          return res.status(400).json("이미 언팔로우한 유저입니다.");
        }

        await user.removeFollowing(targetUserId);

        return res.status(200).json(`${user.nick}님이 언팔로우합니다`);
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
