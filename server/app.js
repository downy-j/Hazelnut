const express = require("express");
const session = require("express-session");

const app = express();
app.set("port", process.env.PORT || 5000);

// 서버 시작
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
