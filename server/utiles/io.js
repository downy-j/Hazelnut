const { User, Chat, UserInfo, Message } = require("../src/models");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// 이미지 파일을 데이터 URI로 변환하는 함수
const getDataURI = (imgPath) => {
  const imagePath = path.join(imgPath);
  const extension = path.extname(imagePath).toLowerCase();
  let mimeType = "image/jpeg";
  if (extension === ".png") {
    mimeType = "image/png";
  } else if (extension === ".gif") {
    mimeType = "image/gif";
  }
  const imageData = fs.readFileSync(imagePath);
  const base64Image = Buffer.from(imageData).toString("base64");
  return `data:${mimeType};base64,${base64Image}`;
};

module.exports = function (io) {
  io.on("connection", async (socket) => {
    // 로그인 성공하면 실행
    socket.on("userLogin", async (getResponse) => {
      if (getResponse) {
        try {
          const userId = getResponse.id;
          await User.update({ socketId: socket.id }, { where: { id: userId } });
          const user = await User.findOne({ where: { id: userId } });

          const response = {
            id: user.id,
            nick: user.nick,
            email: user.email,
            socketId: user.socketId,
          };

          console.log(`유저 ${user.nick} 소켓id 업데이트 :`, socket.id);
          socket.emit("loginSuccess", response);
        } catch (error) {
          console.error(`유저 ${user.nick}  소켓id 업데이트 에러:`, error);
        }
      }
    });

    // 새로고침시 유저 소켓id 재발급
    socket.on("refresh", async (getResponse) => {
      if (getResponse) {
        try {
          const userId = getResponse.id;
          await User.update({ socketId: socket.id }, { where: { id: userId } });
          const user = await User.findOne({ where: { id: userId } });

          const response = {
            id: user.id,
            nick: user.nick,
            email: user.email,
            socketId: user.socketId,
          };

          console.log(`유저 ${user.nick}  소켓id 재발급 :`, socket.id);
          socket.emit("refreshSuccess", response);
        } catch (error) {
          console.error(`유저 소켓id 재발급 에러:`, error);
        }
      }
    });

    // 채팅방 만들기
    socket.on(
      "createChatRoom",
      async ({ chatRoomName, clickedUser, accToken }) => {
        if (!accToken) {
          return socket.emit("createChatRoomError", {
            error: "토큰이 없습니다.",
          });
        }

        try {
          const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

          // 채팅방 생성
          const chatRoom = await Chat.create({ title: chatRoomName });

          await chatRoom.addUser(clickedUser); // 초대한 유저 추가
          await chatRoom.addUser(decodedToken.id); // 본인 추가

          socket.emit("createChatRoomSuccess", { message: "채팅방 생성 완료" });
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            res.status(401).json({
              error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
            });
          } else {
            console.log(error);
            res.status(500).json({ error: "서버 오류" });
          }
        }
      }
    );

    // 채팅방 보내기
    socket.on("getRooms", async ({ accToken }) => {
      if (!accToken) {
        return socket.emit("getRoomsError", {
          error: "토큰이 없습니다.",
        });
      }

      try {
        const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);
        const userId = decodedToken.id;

        const rooms = await User.findByPk(userId, {
          include: {
            model: Chat,
            through: "UserChat",
            include: {
              model: User,
              attributes: ["id", "nick"],
            },
            attributes: ["id", "title"],
          },
          attributes: ["id", "nick"],
        });

        const memberIds = rooms.Chats.map((chat) =>
          chat.Users.map((user) => user.id)
        );

        // 모든 사용자의 imgURL을 가져오기 위한 Promise 배열
        const userInfoPromises = memberIds.map((ids) =>
          Promise.all(
            ids.map(async (id) => {
              const userInfo = await UserInfo.findOne({ where: { id } });

              return userInfo ? getDataURI(userInfo.imgURL) : null;
            })
          )
        );

        // 각 사용자의 imgURL을 가져온 후 response에 추가한다
        const imgURLs = await Promise.all(userInfoPromises);

        const response = {
          roomNames: rooms.Chats.map((chat, index) => ({
            id: chat.id,
            title: chat.title,
            members: chat.Users.map((user, idx) => ({
              id: user.id,
              nick: user.nick,
              imgURL: imgURLs[index][idx], // 해당 사용자의 imgURL
            })),
          })),
        };

        socket.emit("successRoomList", { response });
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          socket.emit("getRoomsError", {
            error: "토큰이 만료되었습니다. 새로운 토큰을 요청하세요.",
          });
        } else {
          console.error(error);
          socket.emit("getRoomsError", {
            error: "서버 오류",
          });
        }
      }
    });

    // 메시지 저장
    socket.on("sendMessage", async ({ message, roomNumber }) => {
      try {
        // 소켓Id로 유저찾고
        const user = await User.findOne({ where: { socketId: socket.id } });

        // 새 매시지 등록
        const newMessage = await Message.create({
          text: message,
          ChatId: roomNumber,
        });

        // 중간테이블 MessageId값과 UserId값 넣어 연결하기
        await newMessage.addUser(user.id);

        const findThisRoomsMessage = await Message.findAll({
          where: { ChatId: roomNumber },
          attributes: ["id", "text"],
          include: [
            {
              model: User,
              through: "UserMessage",
              attributes: ["id", "nick", "socketId"],
              include: [
                {
                  model: UserInfo,
                  attributes: ["id", "imgURL"],
                },
              ],
            },
          ],
        });

        const response = findThisRoomsMessage.map((message) => ({
          userProfileImg: getDataURI(message.Users[0].UserInfo.imgURL),
          userNick: message.Users[0].nick,
          userSocketId: message.Users[0].socketId,
          messageText: message.text,
        }));

        // 등록된 메시지를 클라이언트로 다시 보내기
        socket.emit("message", { response });
      } catch (error) {
        console.error(error);
      }
    });

    // 방번호별 메시지 보내기
    socket.on("getMessages", async ({ roomNumber }) => {
      try {
        // 방번호와 일치하는 메시지 전체 가져오기
        const findThisRoomsMessage = await Message.findAll({
          where: { ChatId: roomNumber },
          attributes: ["id", "text"],
          include: [
            {
              model: User,
              through: "UserMessage",
              attributes: ["id", "nick", "socketId"],
              include: [
                {
                  model: UserInfo,
                  attributes: ["id", "imgURL"],
                },
              ],
            },
          ],
        });

        const response = findThisRoomsMessage.map((message) => ({
          userProfileImg: getDataURI(message.Users[0].UserInfo.imgURL),
          userNick: message.Users[0].nick,
          userSocketId: message.Users[0].socketId,
          messageText: message.text,
        }));

        // 전체 메시지 보내기
        socket.emit("thisRoomsChatList", { response });
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnectd");
    });
  });
};
