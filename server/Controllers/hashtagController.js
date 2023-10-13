/**
 * createTag
 * 역활 : 새 태그를 생성 후 DB에 저장
 * 구현 : client로 부터 전달된 태그 정보를 사용해 새 태그를 생성하고 DB에 저장
 * 사용 예시 : 유저가 새 태그를 생성하고, 태그명 입력 후, server에 "createTag" 요청을 보냄
 */
const createTag = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getTags
 * 역활 : 저장된 모든 태그를 검색 후 client에 반환
 * 구현 : DB에서 모든 태그를 조회 후 조회된 태그 목록을 client에 반환
 * 사용 예시 : client가 모든 태그 목록을 조회하려 할 때, server에 "getTags" 요청을 보냄
 */
const getTags = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {};
