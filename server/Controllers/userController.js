const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

/**
 * createToken
 * 역활 : 유저 토큰 만들기
 * 구현 : jwt를 사용해 유저의 _id 를 토큰화 시킨다
 * 사용 예시 : 이 함수는 유저의 _id 값을 받아서 토큰을 생성하고 반환
 * 클라이언트에서 로그인 또는 회원가입 시, 유저 정보와 함께 토큰을 생성하여 사용할 수 있습
 */
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

/**
 * registerUser
 * 역활 : 유저 등록
 * 구현 : client로 부터 받은 유저 정보를 검증하고, 유효하면 새 유저를 DB에 등록
 * 사용 예시 : 유저가 회원가입 양식을 보내믄, server에서 "registerUser" 함수를 호출해 유저 정보 검증하고 DB에 저장
 * 검증 및 등록이 성공하면, 유저에게 토큰을 제공해 로그인 상태를 유지할 수 있슴
 */
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

/**
 * loginUser
 * 역활 : 유저 로그인
 * 구현 : client에서 받은 email과 password를 검증해, 유효한 경우 토큰 생성해 유저에게 반환
 * 사용 예시 : 유저가 로그인 양식을 쓰고 client에서 server에 "loginUser" 요청을 보냄
 * server는 "loginUser" 함수를 호출해 client에서 받은 email과 password를 검증해, 유효하면 토큰을 생성해 client에 반환
 * client는 이 토큰을 사용해 로그인 상태를 유지하고, 인증된 요청을 server에 보낼 수 있슴
 * 
 */
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

/**
 * findUser
 * 역활 : 특정 유저 찾기
 * 구현 : client에서 요청한 특정 유저의 정보를 DB에서 찾아 반환
 * 사용 예시 : client에서 특정 유저를 조회하고자 "findUser" 요청을 서버에 보냄
 * server는 "findUser" 함수를 호출해 해당 유저의 정보를 DB에서 찾아 client에 반환
 */
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

/**
 * getUsers
 * 역활 : 모든 유저 정보 가져오기
 * 구현 : DB에서 모든 유저 정보를 가져와 client에 반환
 * 사용 예시 : client에서 모든 유저 정보를 가져오고자 "getUsers" 요청을 server에 보냄
 * server는 "getUsers" 함수를 호출해 DB에서 모든 유저 정보를 가져와 client에 반환
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * updateUser
 * 역활 : 유저 정보 업데이트
 * 구현 : client에서 받은 정보로 특정 유저(나) 정보를 업데이트
 * 사용 예시 : client에서 특정 유저(나) 정보를 업데이트하고자 "updateUser" 요청을 서버에 보냄
 * server는 "updateUser" 함수를 호출해 client에서 받은 정보로 해당 유저(나)의 정보를 업데이트
 */
const updateUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * logoutUser
 * 역활 : 유저 로그아웃
 * 구현 : client에서 server로 로그아웃 요청을 보내면, server에서 해당 유저의 인증 토큰을 무효화해 로그아웃 처리 함
 * 사용 예시 : client에서 로그아웃 하려 "logoutUser" 요청을 server에 보냅
 * server는 "logoutUser" 함수 호출해 유저의 인증 토큰을 무효화 후, client에 로그아웃 완료 메시지 반환
 */
const logoutUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
역활과 구현 그리고 사용예시를 채워 주세요
module.exports = { registerUser, loginUser, findUser, getUsers };
