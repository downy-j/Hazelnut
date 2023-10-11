const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  addUploadImage,
  createPost,
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  likePost,
} = require("../Controllers/postController");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const images = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const nunImages = multer();

router.post("/create/img", images.single("img"), addUploadImage);
router.post("/create", nunImages.none(), createPost);

router.get("/get", getAllPost); // OK
router.get("/get/:id", getOnePost);
router.patch("/upd/:id", updatePost);
router.delete("/del/:id", deletePost);
router.patch("/like/:id", likePost);
// router.patch("/unlike/:id", unlikePost);

module.exports = router;
