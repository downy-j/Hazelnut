const multer = require("multer");
const path = require("path");

const moduls = {
  uploadFiles: async (req, res, subfolder) => {
    const accToken = req.cookies.accessToken;
    if (!accToken) {
      return res.status(401).json({ error: "토큰이 없습니다." });
    }

    try {
      const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
      const userNick = decodedToken.nick;

      console.log("2번");
      const uploadsDir = path.join(__dirname, "uploads", userNick, subfolder);

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, uploadsDir);
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + "_" + file.originalname);
        },
      });

      console.log("3번");

      const upload = multer({ storage: storage }).single("image");

      upload(req, res, function (err) {
        if (err) {
          return res.status(500).json({ error: "파일 업로드 실패" });
        }

        res.status(200).json({ message: "파일 업로드 성공" });
      });
    } catch (error) {
      console.error("토큰 검증 에러:", error);
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }
  },
};

module.exports = {
  moduls,
};
