"use strict";

const { User, Post, Hashtag } = require("../../models");
const { path } = require("path");
const jwt = require("jsonwebtoken");

const gets = {
  findPosts: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userNick = req.params.userNick;

      const findUser = await User.findOne({ where: { nick: userNick } });
      if (!findUser) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      const userPosts = await Post.findAll({
        where: { UserId: findUser.id },
      });

      res.status(200).json(userPosts);
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
  findPost: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }
      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

      const userNick = req.params.userNick;
      const postId = req.params.postId;

      const user = await User.findOne({ where: { nick: userNick } });
      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      const userPost = await Post.findOne({
        where: { id: postId, UserId: user.id },
      });
      if (!userPost) {
        return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
      }

      res.status(200).json(userPost);
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
  uploadPost: async (req, res) => {
    try {
      const { content } = req.body;
      const filename = req.file.path;
      const userNick = req.params.userNick;

      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const findUser = await User.findOne({
        where: { nick: userNick },
      });

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const userId = decodedToken.id;

      if (findUser.id === userId) {
        const post = await Post.create({
          content,
          img: filename,
          UserId: userId,
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

        res.status(200).json(post);
      }
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

const patchs = {
  updatePost: async (req, res) => {
    try {
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const userId = decodedToken.id;

      const postId = req.params.postId;
      const content = req.body.content;

      const post = await Post.findOne({
        where: { id: postId, UserId: userId },
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
      const accToken = req.cookies.accessToken;
      if (!accToken) {
        return res.status(401).json({ error: "토큰이 없습니다." });
      }

      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const userId = decodedToken.id;

      const postId = req.params.postId;

      const post = await Post.findOne({
        where: { id: postId, UserId: userId },
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
