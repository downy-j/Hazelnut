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
const postRoute = require("./Routes/postRoute");

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
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// 라우트 연결
app.use("/api/auth", authRoute); // 등록관련 라우트
app.use("/api/post", postRoute); // 게시글 포스팅 라우트

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
