/**
 * authenticateUser
 * 역활 : 유저 인증 수행, 유효한 토큰 또는 자격 증명을 통해 유저 식별
 * 구현 : client로부터 전달된 토큰 또는 자격 증명을 확인, 유저 정보를 요청 객체(req)에 추가
 * 사용 예시 : 보호된 엔드포인트에 들어가기 전, 유저 인증하는 미들웨어로 사용
 */
const authenticateUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {};
