// 모듈
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000; // 서버 포트
const main = require("./src/routes"); // 라우팅 - 주소
const { sequelize } = require("./src/models"); // sequelize - db
const logger = require("./src/log/log"); // widston - log
const passportConfing = require("./src/passport"); // 패스포트

const app = express();
dotenv.config();
passportConfing(); // 패스포트 설정
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connection success. .");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩 파싱
app.use(morgan("tiny", { stream: logger.stream })); // 로깅 미들웨어 (tiny 형식으로 로그 출력)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
); // CORS (Cross-Origin Resource Sharing) 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 파서 미들웨어 (쿠키 처리를 위한 라이브러리 사용)
app.use(
  session({
    resave: false, // 세션 변경 사항이 없을 때도 세션을 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장할지 여부
    secret: process.env.COOKIE_SECRET, // 세션 암호화에 사용되는 키
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 읽을 수 있는 권한 여부
      secure: false, // HTTPS가 아닌 환경에서도 쿠키를 사용할지 여부
    },
  })
); // 세션 미들웨어 (세션 관리를 위한 라이브러리 사용)
app.use(passport.initialize()); // Passport 미들웨어의 초기화
app.use(passport.session()); // Passport가 세션을 지원하도록 설정하는 데 사용

app.use("/", main); // 메인 페이지

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없음.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.json("error");
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트 열림.`);
});
