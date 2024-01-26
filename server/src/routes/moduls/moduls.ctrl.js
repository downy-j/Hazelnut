const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDirectoryExists = (directory) => {
  try {
    //  폴더의 존재 여부 확인
    fs.readdirSync(directory);
  } catch (error) {
    // 에러가 발생하면(폴더가 없으면) 폴더 생성
    console.error(`${directory} 폴더가 없어 ${directory} 폴더를 생성합니다.`);
    fs.mkdirSync(directory);
  }
};

const moduls = {
  createFolder: async (req, res) => {
    const accToken = req.cookies.accessToken;
    if (!accToken) {
      return res.status(401).json({ error: "토큰이 없습니다." });
    }

    try {
      const decodedToken = await jwt.verify(
        accToken,
        process.env.ACCESS_SECRET
      );
      const userNick = decodedToken.nick;

      // uploads 폴더 확인 및 생성
      const uploadsDir = path.join(__dirname, "uploads");
      ensureDirectoryExists(uploadsDir);

      // /:userNick 폴더 확인 및 생성
      const userDir = path.join(uploadsDir, userNick);
      ensureDirectoryExists(userDir);

      // post 폴더 확인 및 생성
      const postDir = path.join(userDir, "post");
      ensureDirectoryExists(postDir);

      // myImage 폴더
      const myImage = path.join(userDir, "myImage");
      ensureDirectoryExists(myImage);
    } catch (error) {
      console.error("토큰 검증 에러:", error);
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }
  },

  uploadFiles: async (req, res, subfolder) => {
    const accToken = req.cookies.accessToken;
    if (!accToken) {
      return res.status(401).json({ error: "토큰이 없습니다." });
    }

    try {
      const decodedToken = await jwt.verify(
        accToken,
        process.env.ACCESS_SECRET
      );
      const userNick = decodedToken.nick;

      const uploadsDir = path.join(__dirname, "uploads", userNick, subfolder);

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, uploadsDir);
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + "_" + file.originalname);
        },
      });

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
