/**
 * searchPosts
 * 역활 : 게시물 검색하는 역할
 * 구현 : client로 부터 검색어 또는 필터 조건을 받아, 해당 조건에 맞는 게시물을 DB에서 찾아 client에 반환
 * 사용 예시 : 유저가 특정 키워드로 게시물을 검색하거나, 필터링해서 게시물을 조회하려 할 때, server에 "searchPosts" 요청
 */
const searchPosts = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { searchPosts };
