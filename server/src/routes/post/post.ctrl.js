"use strict";

const { Post, Hashtag } = require("../../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const gets = {
  findPosts: async (req, res) => {
    try {
      const userPosts = await Post.findAll({
        where: { UserId: req.user.id },
      });
      res.status(200).json(userPosts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  findPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      console.log(`postId >> ${postId}`);

      const userPost = await Post.findOne({
        where: { id: postId, UserId: req.user.id },
      });
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
