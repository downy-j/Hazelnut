const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// DB 불러오기
const connectDB = require("./config/db");
//DB 연결
connectDB();

// 라우트 불러오기
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
// const chatRoomRoute = require("./Routes/chatRoomRoute");
// const messageRoute = require("./Routes/messageRoute");

const app = express();
app.set("port", process.env.PORT || 5000);
// 미들웨어
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false, // 세션 데이터를 변경하지 않더라도 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    secret: process.env.COOKIE_SECRET, // 세션 데이터 암호화를 위한 시크릿 키
    cookie: {
      // 세션 쿠키 설정 (보안 연결 필요 여부 등)
      httpOnly: true,
      secure: false, //보안 연결(HTTPS)을 사용하지 않아도 쿠키를 전송 가능함.
    },
  })
);

// 라우트 연결
app.use("/api/auth", authRoute); // 유저 등록, 인증, 권한 라우트
app.use("/api/user", userRoute); // 유저(들) 찾기, 팔로우/언팔로우
app.use("/api/post", postRoute); // 게시글 포스팅 라우트
//app.use("/api/chatRoom", chatRoomRoute); // 채팅방 생성, 찾기 등..
//app.use("/api/message", messageRoute); // 메세지 생성 찾기 등..

// C = post(), R = get(), U = put(), D = delete()
app.get("/", (req, res) => {
  res.send("Welcome to Hazelnut. .");
});

// 라우트 요청 에러 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없음.`);
  error.status = 404;
  next(error);
});

// 모든 에러 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).json("error");
});

// 서버 시작
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
