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
};

module.exports = {
  gets,
};
