const express = require("express");

const router = express.Router();

// auth 컨트롤러
const authCtrl = require("./auth/auth.ctrl");
const postCtrl = require("./post/post.ctrl");
// const chatCtrl = require("./chat/chat.ctrl");

router.get("/", authCtrl.gets.main); // 로그인성공 메인 진입
router.get("/logout", authCtrl.gets.logout); // 로그아웃
router.get("/find/:userNick", authCtrl.gets.findUser); // 유저 찾기
router.get("/finds", authCtrl.gets.getUsers); // 유저 전부 찾기

router.post("/login", authCtrl.posts.login);
router.post("/register", authCtrl.posts.register);

// post 컨트롤러 - 모델 수정중
router.get("/post", postCtrl.gets.posts); // 게시글 가져오기

router.post("/post", postCtrl.posts.uploadPost); // 게시글 등록

// chat 컨트롤러 - 모델 아직 안만들어짐
// router.get("/chat/:userId", chatCtrl.output.findUserChats);
// router.get("/chat/find/:firstId/:secondId", chatCtrl.output.findChat);

// router.post("/chat", chatCtrl.process.createChat);

module.exports = router;
