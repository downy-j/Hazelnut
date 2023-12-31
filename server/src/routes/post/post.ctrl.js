"use strict";

const { Post, Hashtag } = require("../../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const gets = {
  posts: async (req, res) => {
    const user = await Post.findAll({ where: { UserId } });
    console.log(`user >> ${user}`);
    res.json(user);
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
      console.log("서버 진입은 함??");
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

module.exports = {
  gets,
  posts,
};
