const express = require("express");

const router = express.Router();

// auth 컨트롤러
const authCtrl = require("./auth/auth.ctrl");

router.get("/", authCtrl.output.main); // 로그인성공 메인 진입
router.get("/login", authCtrl.output.login);
router.get("/register", authCtrl.output.register);
router.get("/logout", authCtrl.output.logout);

router.post("/login", authCtrl.process.login);
router.post("/register", authCtrl.process.register);

// post 컨트롤러
const postCtrl = require("./post/post.ctrl");

router.get("/post", postCtrl.output.posts);

router.post("/post", postCtrl.process.uploadPost);

module.exports = router;
