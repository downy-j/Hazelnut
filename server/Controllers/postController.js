const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");

const addUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
};
const createPost = async (req, res) => {
  try {
    const { title, content, img, writer } = req.body;

    const hashtags = req.body.content.match(/#[^\s#]*/g);
    const result = hashtags
      ? hashtags.map((tag) => tag.slice(1).toLowerCase())
      : [];

    const post = await new postModel({
      title,
      content,
      img: img,
      writer,
      likes: 0,
      hashtag: result,
    });

    const savePost = await post.save();
    res.status(200).json(savePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "게시물 생성 중 오류가 발생했습니다." });
  }
};

// 게시글 전부 가져오기 R GET /get
const getAllPost = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const postPerPage = 10;

    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(page * postPerPage)
      .limit(postPerPage);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 특정 게시글 하나 가져오기 R GET /get/:userId
const getOnePost = async (req, res) => {
  const postId = req.params.userId;
  try {
    const post = await postModel.findOne({ _id: postId });

    if (post) {
      return res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "게시물을 불러오는 중 오류가 발생했습니다." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 게시글 수정 U PATCH /upd/:userId
const updatePost = async (req, res) => {
  const updates = {
    title: req.body.title,
    content: req.body.content,
    img: req.body.url || null,
  };
  try {
    const updatedPost = await postModel.updateOne(
      { _id: req.params.id },
      { $set: updates }
    );

    if (updatedPost.nModified > 0) {
      const updatedPostInfo = await postModel.findById(req.params.id);
      res.status(200).json(updatedPostInfo);
    } else {
      res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "게시물 업데이트 중 오류가 발생했습니다." });
  }
};

//게시글 삭제 D DELETE /del/:id
const deletePost = async (req, res) => {
  try {
    const result = await postModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "게시물이 삭제되었습니다." });
    } else {
      res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

//좋아요 PATCH /like/:id
const likePost = async (req, res) => {
  try {
    const postId = req.params.id; // 게시물 ID를 가져옵니다.
    const userId = "사용자의 ID 또는 세션에서 가져온 사용자 식별 정보"; // 사용자 식별 정보

    // 게시물을 찾습니다.
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }

    // 사용자가 이미 좋아요를 눌렀는지 확인
    const likedByUser = post.likes.map((like) => like.user).includes(userId);

    if (!likedByUser) {
      // 아직 좋아요를 누르지 않았다면 추가
      post.likes.push({ user: userId });
      post.likeCount += 1;
    } else {
      // 좋아요를 눌렀다면 취소
      post.likes = post.likes.filter((like) => !like.user.equals(userId));
      post.likeCount -= 1;
    }

    // 게시물 업데이트
    await post.save();
    res
      .status(200)
      .json({ message: "좋아요 토글이 성공적으로 처리되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 댓글

module.exports = {
  addUploadImage,
  createPost,
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  likePost,
};
