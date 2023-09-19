const User = require("../Schemas/userSchema");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// 토큰화
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

// 유저 등록
const userRegist = async (req, res) => {
  const { nick, email, password } = req.body; // nick, email, password 를 입력
  try {
    let user = await User.findOne({ email }); // User에서 입력한 email을 찾아봐

    if (user)
      return res
        .status(400)
        .json("해당 이메일을 가진 사용자가 이미 존재합니다. ."); // 같은게 있으면 여기로

    if (!nick || !email || !password)
      return res.status(400).json("모든 입력란을 채워 주세요. . ."); // 빈값은 여기로

    if (!validator.isEmail(email))
      return res.status(400).json("유효한 이메일이 아닙니다. . ."); // email양식이 아니면

    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json("대소문자, 숫자, 특수기호 포함 8자이상으로 만들어주세요. . ."); // 비번이 단순하면

    // 입력한 nick email password 를  user에 넣어
    user = new User({ nick, email, password });

    const salt = await bcrypt.genSalt(10); // 랜덤 함수 salt를 만들거 총 10라운드
    user.password = await bcrypt.hash(user.password, salt); // 유저 비번 해싱해서 담아

    await user.save(); // 값 저장
    const token = createToken(user._id); // createToken()으로 사용자 _id를 토큰화

    // JSON으로 그 값 던져
    res.status(200).json({ _id: user._id, nick, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//유저 로그인
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json("잘못된 이메일 또는 비밀번호. . .");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json("잘못된 이메일 또는 비밀번호. . .");

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, nick: user.nick, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// 유저 찾기
const userFind = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//유저 정보 가져오기
const userGet = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { userRegist, userLogin, userFind, userGet };
