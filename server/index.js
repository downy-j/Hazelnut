const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./utiles/io")(io);

httpServer.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트 열림.`);
});
