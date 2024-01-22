"use strict";

const { User, Post, Hashtag } = require("../../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const gets = {
  findPosts: async (req, res) => {
    try {
      const userNick = req.params.userNick;

      const user = await User.findOne({ where: { nick: userNick } });

      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      const userPosts = await Post.findAll({
        where: { UserId: user.id },
      });

      res.status(200).json(userPosts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  findPost: async (req, res) => {
    try {
      const userNick = req.params.userNick;
      const postId = req.params.postId;

      // 로그인 함? 그럼 초기화 하고 UserId로 조회
      const whereCondition = {};
      if (req.user) {
        whereCondition.UserId = req.user.id;
      }

      const user = await User.findOne({ where: { nick: userNick } });
      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      const userPost = await Post.findOne({
        where: { id: postId, ...whereCondition, UserId: user.id },
      });
      if (!userPost) {
        return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
      }

      res.status(200).json(userPost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const posts = {
  uploadPost: async (req, res) => {
    try {
      const post = await Post.create({
        content: req.body.content,
        img: req.body.url,
        UserId: req.user.id,
      });

      const hashtags = req.body.content.match(/#[^\s#]*/g);
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) => {
            return Hashtag.findOrCreate({
              where: { title: tag.slice(1).toLowerCase() },
            });
          })
        );
        await post.addHashtags(result.map((r) => r[0]));
      }
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const patchs = {
  updatePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const content = req.body.content;

      const post = await Post.findOne({
        where: { id: postId, UserId: req.user.id },
      });

      await post.update({
        content,
      });

      const hashtags = content.match(/#[^\s#]*/g);
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) => {
            return Hashtag.findOrCreate({
              where: { title: tag.slice(1).toLowerCase() },
            });
          })
        );
        await post.addHashtags(result.map((r) => r[0]));
      }
      res.status(200).json({ message: "게시글이 수정 되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

const deletes = {
  deletePost: async (req, res) => {
    try {
      const postId = req.params.postId;

      const post = await Post.findOne({
        where: { id: postId, UserId: req.user.id },
      });

      await post.destroy();

      res.status(200).json({ message: "게시글이 삭제 되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = {
  gets,
  posts,
  patchs,
  deletes,
};
