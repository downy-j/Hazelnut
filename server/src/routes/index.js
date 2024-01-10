const express = require("express");

const router = express.Router();

// auth 컨트롤러
const authCtrl = require("./auth/auth.ctrl");
const postCtrl = require("./post/post.ctrl");
const userCtrl = require("./user/user.ctrl");
const chatCtrl = require("./chat/chat.ctrl");

// authCtrl
router.get("/", authCtrl.gets.main); // 메인페이지
router.get("/:userNick", authCtrl.gets.userPage); // 각 유저의 페이지
router.get("/logout", authCtrl.gets.logout); // 로그아웃

router.post("/login", authCtrl.posts.login); // 로그인
router.post("/register", authCtrl.posts.register); // 회원등록

// postCtrl
router.get("/posts", postCtrl.gets.findPosts); // 게시글 전부 가져오기
router.get("/post/:postId", postCtrl.gets.findPost); // 게시글 하나 가져오기

router.post("/post", postCtrl.posts.uploadPost); // 게시글 등록

router.patch("/post/:postId", postCtrl.patchs.updatePost); // 게시글 수정

router.delete("/post/:postId", postCtrl.deletes.deletePost); // 게시글 삭제

// userCtrl
router.get("/:userNick/recentPost", userCtrl.gets.recentPost); // 최근 게시글 가져오기
router.get("/notes", userCtrl.gets.note); // 쪽지 보기
router.get("/interest", userCtrl.gets.interest); // 관심사 보기
router.get("/:userNick/find", userCtrl.gets.findUser); // 유저 찾기
router.get("/finds", userCtrl.gets.getUsers); // 유저 전부 찾기

router.post("/:userId/follow", userCtrl.posts.follow); // 팔로우
router.post("/interest", userCtrl.posts.interest); // 관심사 등록
router.post("/:userId/note", userCtrl.posts.note); // 쪽지 등록

router.delete("/unfollow/:userId", userCtrl.deletes.unfollow);
router.delete("/note/:noteId", userCtrl.deletes.note);
router.delete("/interest/:interestId", userCtrl.deletes.interest);

// chat 컨트롤러 - 모델 아직 안만들어짐

module.exports = router;
