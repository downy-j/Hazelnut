// 모듈
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");

dotenv.config();
const { sequelize } = require("./src/models");
const passportConfing = require("./src/passport");

const app = express();
passportConfing(); // 패스포트 설정
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connection success. .");
  })
  .catch((err) => {
    console.error(err);
  });

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
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
const main = require("./src/routes");

app.use("/", main);

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
