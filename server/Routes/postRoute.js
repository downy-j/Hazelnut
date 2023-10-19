const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  addUploadImage,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../Controllers/postController");

const { likePost } = require("../Controllers/likeController");

const {
  addComment,
  getComments,
  deleteComment,
} = require("../Controllers/commentController");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/create/img", upload.single("img"), addUploadImage);

const upload2 = multer();
router.post("/create", upload2.none(), createPost);

router.get("/get", getPosts); // 전부 가져오기
router.get("/get/:id", getPost); // 선택해 가져오기
router.post("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

// likeController
router.post("/likes/:postId", likePost); //like

// commentController
router.post("/comment/:postId", addComment);
router.get("/gets/comment/:postId", getComments);
router.delete("/delete/comment/:postId", deleteComment);

module.exports = router;
