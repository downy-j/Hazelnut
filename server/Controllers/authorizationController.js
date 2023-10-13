/**
 * authorizeUser
 * 역활 : 유저 권한확인 후 특정 조건 따라 권한이 없으면 요청을 거부
 * 구현 : 유저 권한확인 후 권한 없으면 응답에 403 코드를 설정 에러 메시지를 반환
 * 사용 예시 : 특정 엔드포인트에서 유저 권한확인 후 권한 없을 시 거부하는 미들웨어로 사용
 */
const authorizeUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {};
