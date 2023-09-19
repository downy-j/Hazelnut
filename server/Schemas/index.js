const mongoose = require("mongoose");

// `production` 환경이 아닌 경우 디버깅 모드를 활성화
const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  // MongoDB에 연결
  const ID = process.env.MONGO_ID;
  const PW = process.env.MONGO_PASSWORD;

  mongoose
    .connect(
      `mongodb+srv://${ID}:${PW}@hazelnutcluster.xko76f0.mongodb.net/Hazelnut?retryWrites=true&w=majority`,
      {
        dbName: "Hazelnut",
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("몽고디비 연결 성공");
    })
    .catch((err) => {
      console.error("몽고디비 연결 에러", err);
    });
};
// 연결 상태에 대한 이벤트 핸들러
mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
