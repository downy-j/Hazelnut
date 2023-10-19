const commentModel = require("../Models/commentModel");
/**
 * addComment
 * 역활 : 특정 리소스에 댓글을 추가 후 DB에 저장
 * 구현 : client로 부터 전달된 댓글 내용과 유저 정보를 사용해 새 댓글 생성하고 DB에 저장
 * 사용 예시 : 유저가 특정 게시물에 댓글 내용을 입력 후, server에 "addComment" 요청을 보냅
 */
const addComment = async (req, res) => {
  try {
    const comment = new commentModel({
      content: req.body.content,
      commenterId: req.user.id,
      postId: req.params.postId,
    });

    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getComments
 * 역활 : 특정 리소스에 연결된 모든 댓글을 검색후 client에 반환
 * 구현 : DB에서 특정 리소스에 연결된 모든 댓글을 조회. 조회된 댓글 목록을 client에 반환
 * 사용 예시 : client가 특정 게시물에 연결된 모든 댓글을 조회하려 할 때, server에 "getComments" 요청을 보냄
 */
const getComments = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const commentPerPage = 10;

    const comments = await commentModel
      .find()
      .sort({ createdAt: -1 })
      .skip(page * commentPerPage)
      .limit(commentPerPage);

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * deleteComment
 * 역활 : 특정 댓글을 식별후 삭제
 * 구현 : client로 부터  전달된 댓글 _id를 사용해 특정 댓글을 DB에서 삭제
 * 사용 예시 : 유저가 특정 댓글을 삭제하려 할 때, server에 "deleteComment" 요청을 보냄
 */
const deleteComment = async (req, res) => {
  try {
    const result = await commentModel.deleteOne({ commenterId: req.user.id });

    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: `${commenterId.nick}님의 댓글이 삭제 되었습니다.` });
    } else {
      res
        .status(404)
        .json({ message: `${commenterId.nick}님의 댓글을 찾을 수 없습니다.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { addComment, getComments, deleteComment };
