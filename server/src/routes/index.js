const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// auth 컨트롤러
const authCtrl = require("./auth/auth.ctrl");
const postCtrl = require("./post/post.ctrl");
const userCtrl = require("./user/user.ctrl");
const chatCtrl = require("./chat/chat.ctrl");
const tokenCtrl = require("./token/token.ctrl");
const modulsCtrl = require("./moduls/moduls.ctrl");

// 유저 고유폴더 찾기
const userFolder = (nick, dirType) => {
  const serverDir = path.resolve(__dirname, "..", ".."); // server 폴더까지의 상대 경로 설정

  const userDir = path.join(serverDir, "uploads", nick); // 유저의 폴더 경로 설정

  const myImageDir = path.join(userDir, dirType); // 유저 폴더 안의 myImage 폴더 경로 설정

  return myImageDir;
};

// 사진등록 미들웨어
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const userNick = req.params.userNick;
      cb(null, userFolder(userNick, "myImage"));
    },

    filename: function (req, file, cb) {
      const userNick = req.params.userNick;
      const nowDate = new Date().toISOString().slice(0, 10);
      const fileName = file.originalname;
      const result = `${userNick}_${nowDate}_${fileName}`;

      cb(null, result);
    },
  }),
});

// 포스팅사진 등록용 미들웨어
const postUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const userNick = req.params.userNick;
      cb(null, userFolder(userNick, "post"));
    },

    filename: function (req, file, cb) {
      const userNick = req.params.userNick;
      const nowDate = new Date().toISOString().slice(0, 10);
      const fileName = file.originalname;
      const result = `${userNick}_${nowDate}_${fileName}`;

      cb(null, result);
    },
  }),
});

// 내 이미지 등록, DB에 저장까지
router.post(
  "/:userNick/profileImage",
  upload.single("image"),
  userCtrl.patchs.myProFileImage
);

// tokenCtrl
router.get("/getUserData", tokenCtrl.gets.getUserData);
router.get("/accessToken", tokenCtrl.gets.accessToken);
router.get("/refreshToken", tokenCtrl.gets.refreshToken);

// authCtrl
router.get("/", authCtrl.gets.main); // 메인페이지

router.post("/logout", authCtrl.gets.logout); // 로그아웃
router.post("/login", authCtrl.posts.login); // 로그인

router.post(
  "/register",
  authCtrl.posts.register // 회원가입
); // 회원등록

// postCtrl
router.get("/:userNick/posts/img", postCtrl.gets.findPostsImg); // 해당 페이지 유저의 게시글 사진만 전부 가져오기(방문객 로그인한 나 모두 볼수 있음)
router.get("/:userNick/post/:postId", postCtrl.gets.findPost); // 해당 페이지 유저의 게시글 하나 가져오기(방문객 로그인한 나 모두 볼수 있음)

router.post(
  "/:userNick/post/img",
  postUpload.single("postImage"),
  postCtrl.posts.uploadPost
); // 게시물 사진 등록

router.patch("/post/:postId", postCtrl.patchs.updatePost); // 로그인한 내가 내 게시글 수정
router.delete("/post/:postId", postCtrl.deletes.deletePost); // 로그인한 내가 내 게시글 삭제

// userCtrl
router.get("/:userNick", userCtrl.gets.userInfo); // 각 유저의 페이지
router.get("/:userNick/recentPost", userCtrl.gets.recentPost); // 최근 게시글 가져오기
router.get("/:userNick/notes", userCtrl.gets.note); // 로그인한 내가 내 쪽지를 봄(방문자는 보면 안됨)
router.get("/:userNick/interest", userCtrl.gets.interest); // 로그인한 내가(또는 방문한 사람이) 관심사 보기
router.get("/:userNick/find", userCtrl.gets.findUser); // 유저 찾기 - 채팅방관련된거
router.get("/finds", userCtrl.gets.getUsers); // 유저 전부 찾기 - 채팅방 관련된거

router.post("/:userNick/follow", userCtrl.posts.follow); // 로그인한 내가 너를 팔로우
router.post("/interest", userCtrl.posts.interest); // 로그인한 내가 내 관심사 등록
router.post("/:userNick/note", userCtrl.posts.note); // 로그인한 내가 너에게(userNick) 쪽지 등록

router.patch("/update/userInfo/textBox", userCtrl.patchs.updateOnLineID); // 대화상자 업뎃

router.delete("/:userNick/unfollow", userCtrl.deletes.unfollow); // 로그인한 내가 너를 언팔하기
router.delete("/note/:noteId", userCtrl.deletes.note); // 로그인한 내가 내 쪽지 삭제
router.delete("/interest/:interestId", userCtrl.deletes.interest); // 로그인한 내가 내 관심사 삭제

// chat 컨트롤러 - 모델 아직 안만들어짐

module.exports = router;
