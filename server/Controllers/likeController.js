const likeModel = require("../Models/likeModel");

/**
 * likePost
 * 역활 : 특정 게시물에 좋아요 추가 및 제거 하는 기능
 * 구현 : client로 부터 전달된 게시물 _id와 유저 정보를 사용해 "좋아요"를 추가 or 제거
 * 사용 예시 : 유저가 특정 게시물에 "좋아요"를 추가 or 제거 할 때, server에 "likePost" 요청을 보냄
 */
const likePost = async (req, res) => {
  try {
    const userId = req.user.id; // 현재 사용자의 ID
    const postId = req.params.postId; // 게시물의 ID
    const type = req.body.type;

    // 게시물이 존재하는지 확인
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    // 사용자가 이미 해당 게시물에 "좋아요"를 한 경우
    const existingLike = await likeModel.findOne({ userId, postId });

    if (existingLike) {
      // 이미 좋아요 함
      if (type === existingLike.type) {
        // 클릭하면 "좋아요" 해제와 카운트 감소
        await existingLike.remove();
        await likeModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
        res.status(200).json({ message: "좋아요 취소" });
      }
    } else {
      // 좋아요 안했음
      if (type === "like") {
        const newLike = await new likeModel({
          userId,
          postId,
          type: "like",
        }).save();
        await likeModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
        res.status(200).json({ message: "좋아요" });
      }
    }
    newLike.save();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { likePost };
