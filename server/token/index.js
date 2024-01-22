const jwt = require("jsonwebtoken");
const User = require("../src/models/User");

/**
 * 사용자의 인증을 위해 Access Token과 Refresh Token을 생성하고 반환.
 *
 * @param {string} userId - 유저의 고유 식별자
 * @param {string} userNick - 유저의 닉네임.
 * @param {string} userEmail - 유저의 이메일 주소.
 * @returns {Object} - Access Token과 Refresh Token이 포함된 객체.
 * @property {string} accessToken - 생성된 Access Token.
 * @property {string} refreshToken - 생성된 Refresh Token.
 * @property {string | undefined} error - 에러 메시지 (에러 발생 시에만 존재).
 */
const createUserToken = (userId, userNick, userEmail) => {
  try {
    // Generate Access Token
    const accessToken = jwt.sign(
      {
        id: userId,
        nick: userNick,
        email: userEmail,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1m",
        issuer: "Downy",
      }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      {
        id: userId,
        nick: userNick,
        email: userEmail,
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "24h",
        issuer: "Downy",
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * 제공받은 Access Token을 유효성 검사와 해독,
 * DB에서 유저 정보 검색 후 비번 제외 유저 정보 반환
 *
 * @async
 * @param {string} token - 유효성을 검사하고 해독할 Access Token입니다.
 * @returns {Promise<Object>} - 유저 정보를 담은 객체(비밀번호 제외) 또는
 * 프로세스 도중 발생한 문제가 있을 경우 오류 속성이 포함된 객체를 반환하는 Promise입니다.
 * @property {string | undefined} error - 오류 메시지(검증 또는 DB 쿼리 중 발생한 오류의 경우).
 */
const accessToken = async (token) => {
  try {
    // Access Token을 검증하고 해독
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    // 디코딩된 이메일 기반 DB에서 일치하는 유저 정보 찾기
    const userData = await User.findOne({ where: { email: data.email } });

    if (userData) {
      // 유저 정보 중 비번은 제외
      const { password, ...others } = userData;
      return others;
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    // 검증 또는 DB 쿼리 오류 처리
    return { error: error.message };
  }
};

/**
 * 제공된 Refresh Token을 유효성 검사하고 해독,
 * DB에서 유저 정보 검색 후 새로운 Access Token을 생성해 반환
 *
 * @async
 * @param {string} token - 유효성을 검사와 해독에 쓸 Refresh Token
 * @returns {Promise<string | Object>} - 새로 생성된 Access Token이 성공적으로 반환되면 해당 값을 갖는 Promise,
 * 만약 프로세스 도중에 문제가 발생하면 오류 속성이 포함된 객체를 반환하는 Promise
 * @property {string | undefined} error - 오류 메시지(검증 또는 DB 쿼리 중 발생한 오류의 경우).
 */
const refreshToken = async (token) => {
  try {
    // Refresh Token을 검증하고 해독
    const data = jwt.verify(token, process.env.REFRESH_SECRET);

    // 디코딩된 이메일 기반 DB에서 일치하는 유저 정보 찾기
    const userData = await User.findOne({ where: { email: data.email } });

    // 새로운 Access Token을 생성
    const accessToken = jwt.sign(
      {
        id: userData.id,
        nick: userData.nick,
        email: userData.email,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1m",
        issuer: "Downy",
      }
    );

    return accessToken;
  } catch (error) {
    // 검증 또는 DB 쿼리 오류 처리
    return { error: error.message };
  }
};

module.exports = {
  createUserToken,
  accessToken,
  refreshToken,
};
