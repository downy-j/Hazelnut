const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const gets = {
  accessToken: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const data = jwt.verify(token, process.env.ACCESS_SECRET);

      const userData = await User.findOne({ where: { email: data.email } });

      if (userData) {
        // 유저 정보 중 비번은 제외
        const { password, ...others } = userData;

        res.status(200).json(others);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      const data = jwt.verify(token, process.env.REFRESH_SECRET);

      const userData = await User.findOne({ where: { email: data.email } });

      const accessToken = jwt.sign(
        {
          id: userData.id,
          userName: userData.userName,
          email: userData.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "24h",
          issuer: "Downy",
        }
      );

      res.cookie("accessToken", accessToken, {
        // secure: false,
        // httpOnly: true,
      });

      res.status(200).json("Access Token Recreated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserData: async (req, res) => {
    const accToken =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!accToken) {
      return res.status(401).json({ error: "토큰이 없습니다." });
    }

    const decodedToken = jwt.verify(accToken, process.env.ACCESS_SECRET);

    const findUserData = await User.findOne({
      where: { nick: decodedToken.nick },
      attributes: ["id", "nick", "email", "socketId"],
    });

    const response = {
      id: findUserData.id,
      nick: findUserData.nick,
      email: findUserData.email,
      socketId: findUserData.socketId,
    };
    res.status(200).json(response);
  },
};

module.exports = {
  gets,
};
