const postModel = require("../Models/postModel");

/**
 * addUploadImage
 * 역활 : 이미지 업로드를 처리하고 업로드된 이미지의 URL을 클라이언트에 반환
 * 구현 : client로 부터 전달된 이미지 파일(`req.file`)을 업로드하고
 * 업로드된 이미지의 URL을 생성해 client에 반환
 * 사용 예시 : 유저가 이미지를 업로드하고 업로드된 이미지의 URL을 얻고자 할 때,
 * server에 "addUploadImage" 요청
 */
const addUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

/**
 * createPost
 * 역활 : 게시물을 생성하고 데이터베이스에 저장
 * 구현 : client로 부터 전달된 게시물 정보(제목, 내용, 이미지 URL, 작성자, 해시태그 등)를 사용해 게시물을 생성하고 DB에 저장
 * 사용 예시 : 유저가 게시물을 작성하고 DB에 저장하려 할 때, server에 "createPost" 요청
 */
const createPost = async (req, res) => {
  try {
    let imgURL = null;
    if (req.file) {
      imgURL = addUploadImage(req, res);
    }

    const { title, content, writer } = req.body;

    const hashtags = req.body.content.match(/#[^\s#]*/g);
    const result = hashtags
      ? hashtags.map((tag) => tag.slice(1).toLowerCase())
      : [];

    const post = await new postModel({
      title,
      content,
      img: imgURL,
      writer,
      hashtags: result,
    });

    const savePost = await post.save();
    res.status(200).json(savePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "게시물 생성 중 오류가 발생했습니다." });
  }
};

/**
 * getPosts
 * 역활 : 게시물 목록을 가져오는 역할
 * 구현 : client로 부터 페이지 번호(`req.query.page`)를 받아 해당 페이지에 대한 게시물 목록을
 * DB에서 조회하고, 최신 게시물부터 정렬해 반환
 * 사용 예시 : 유저가 게시물 목록을 조회하려 할 때, server에 "getPosts" 요청
 */
const getPosts = async (req, res) => {
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

/**
 * getPost
 * 역활 : 특정 게시물을 가져오는 역할
 * 구현 : client로 부터 게시물의 _id(`req.params.userId`)를 받아 해당 게시물을 DB에서 조회하고 client에 반환
 * 사용 예시 : 유저가 특정 게시물을 조회하려 할 때, server에 "getPost" 요청
 */
const getPost = async (req, res) => {
  const postId = req.params.id;
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

/**
 * updatePost
 * 역활 : 게시물을 업뎃(수정)하는 역할
 * 구현 : client로 부터 게시물 _id(`req.params.id`) 및 업뎃할 내용(`req.body.title`, `req.body.content`, `req.body.url`)이런거
 * 받아 해당 게시물을 DB에서 업뎃하고, 업뎃된 게시물 정보를 client에 반환
 * 사용 예시 : 유저가 게시물을 수정하고자 할 때, server에 "updatePost" 요청
 */
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

    if (updatedPost.nModified < 1) {
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

/**
 * deletePost
 * 역활 : 게시물을 삭제하는 역할
 * 구현 : client로 부터 게시물 _id(`req.params.id`)를 받아 해당 게시물을 DB에서 삭제하고, client에 삭제 성공 또는 실패 메시지를 반환
 * 사용 예시 : 유저가 게시물을 삭제하려 할 때, 서버에 "deletePost" 요청
 */
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
// const likePost = async (req, res) => {
//   try {
//     const postId = req.params.id; // 게시물 ID를 가져옵니다.
//     const userId = "사용자의 ID 또는 세션에서 가져온 사용자 식별 정보"; // 사용자 식별 정보

//     // 게시물을 찾습니다.
//     const post = await PostModel.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
//     }

//     // 사용자가 이미 좋아요를 눌렀는지 확인
//     const likedByUser = post.likes.map((like) => like.user).includes(userId);

//     if (!likedByUser) {
//       // 아직 좋아요를 누르지 않았다면 추가
//       post.likes.push({ user: userId });
//       post.likeCount += 1;
//     } else {
//       // 좋아요를 눌렀다면 취소
//       post.likes = post.likes.filter((like) => !like.user.equals(userId));
//       post.likeCount -= 1;
//     }

//     // 게시물 업데이트
//     await post.save();
//     res
//       .status(200)
//       .json({ message: "좋아요 토글이 성공적으로 처리되었습니다." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "서버 오류" });
//   }
// };

// 댓글

module.exports = {
  addUploadImage,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
