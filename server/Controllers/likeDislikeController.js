/**
 * likePost
 * 역활 : 특정 게시물에 "좋아요"를 추가 or 제거
 * 구현 : client로 부터 전달된 게시물 _id와 유저 정보를 사용해 "좋아요"를 추가 or 제거
 * 사용 예시 : 유저가 특정 게시물에 "좋아요"를 추가 or 제거 할 때, server에 "likePost" 요청을 보냄
 */
const likePost = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * dislikePost
 * 역활 : 특정 게시물에 "싫어요" 표시를 추가 or 제거
 * 구현 : client로 부터 전달된 게시물 _id와 유저 정보를 사용해 "싫어요"를 추가 or 제거
 * 사용 예시 : 유저가 특정 게시물에 "싫어요"를 추가 or 제거 할 때, server에 "dislikePost" 요청을 보냄
 */
const dislikePost = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {};
