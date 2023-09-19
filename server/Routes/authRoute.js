const express = require("express");
const {
  userRegist,
  userLogin,
  userFind,
  userGet,
} = require("../Controllers/authController");

const router = express.Router();

router.post("/regist", userRegist); // 등록
router.post("/login", userLogin); // 로그인
router.get("/find/:userId", userFind); // 계정찾기
router.get("/", userGet); // 유저 가져오기 (메인화면으로)

module.exports = router;
