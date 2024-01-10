"use strict";

const { User, Chat, Message } = require("../../models");

const gets = {
  findUserChats: async (req, res) => {
    try {
      const userId = req.params.userId;

      const userChats = await User.findByPk(userId, {
        include: [{ model: Chat, as: "chats", through: "UserChat" }],
      });

      res.status(200).json(userChats.chats);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  findChat: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const posts = {
  createChat: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      const chatRoom = await Chat.create({
        title: req.body.title,
      });

      await user.addChat(chatRoom);

      const userChats = await User.findByPk(userId, {
        include: [{ model: Chat, as: "chats" }],
      });

      res.status(200).json(userChats.chats);
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
