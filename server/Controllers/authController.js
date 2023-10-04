const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// 유저 토큰 만들기
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

// 유저 등록
const registerUser = async (req, res) => {
  try {
    const { nick, email, password } = req.body; //  내가입력한 값 중에...

    let user = await userModel.findOne({ email }); // userModel에 email 만 담아봐 일단

    if (user) {
      return res.status(400).json("해당 이메일 사용자가 이미 존재합니다"); // email 중복 확인 ㄱㄱ
    }

    if (!nick || !email || !password) {
      return res.status(400).json("모든 입력란을 채워 주세요."); // 입력은 빈칸없이 다 함?
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("유효한 이메일이 아닙니다."); // 이메일형식 맞음?
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("강력한 비밀번호로 다시 입력해 주세요."); // 비밀번호는 안전함?
    }

    user = new userModel({ nick, email, password }); // ...이상없으면 new userModel 해서 담아 넣고 user에 넣어놔봐

    const salt = await bcrypt.genSalt(10); // 비번 암호화 걸꺼야 salt 10라운드
    user.password = await bcrypt.hash(user.password, salt); // user.password 값 안에 함호화 걸어 담어

    await user.save(); // 그리고 저장

    const token = createToken(user._id); // user안에 _id 값을 createToken()함수에서 토큰화 시켜 담어

    res.status(200).json({ _id: user._id, nick, email, token }); // _id, nick, email, password 불러와
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 유저 로그인
const loginUser = async (req, res) => {
  try {
    // 내가 입력한거...
    const { email, password } = req.body;
    // userModel에 email에서 찾아 담아봐
    let user = await userModel.findOne({ email });

    // 근데 없음?
    if (!user) {
      return res.status(400).json("존재하지 않는 사용자 입니다.");
    }
    // 비번 복호화 해서 isValidPassword에 담아봐
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json("잘못된 이메일 또는 비밀번호.");
    }

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, nick: user.nick, email, token }); // 그러면 들어가
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// 유저 찾기
const findUser = async (req, res) => {
  // :userId라는 파라메터의 값 받아와
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId); // userModel에서 받아온 userId 찾아서 user에 담아
    res.status(200).json(user); // 있으면 찾은거
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// 유저 정보 전부 갖고오기
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
