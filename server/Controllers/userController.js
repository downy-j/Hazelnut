const userModel = require("../Models/userModel");
const followModel = require("../Models/followModel");
/**
 * findUser
 * 역활 : 특정 유저 찾기
 * 구현 : client에서 요청한 특정 유저의 정보를 DB에서 찾아 반환
 * 사용 예시 : client에서 특정 유저를 조회하고자 "findUser" 요청을 서버에 보냄
 * server는 "findUser" 함수를 호출해 해당 유저의 정보를 DB에서 찾아 client에 반환
 */
const findUser = async (req, res) => {
  // :userId라는 파라메터의 값 받아와
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId); // userModel에서 받아온 userId 찾아서 user에 담아
    res.status(200).json(user); // 있으면 찾은거
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getUsers
 * 역활 : 모든 유저 정보 가져오기
 * 구현 : DB에서 모든 유저 정보를 가져와 client에 반환
 * 사용 예시 : client에서 모든 유저 정보를 가져오고자 "getUsers" 요청을 server에 보냄
 * server는 "getUsers" 함수를 호출해 DB에서 모든 유저 정보를 가져와 client에 반환
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * updateUser
 * 역활 : 유저 정보 업데이트
 * 구현 : client에서 받은 정보로 특정 유저(나) 정보를 업데이트
 * 사용 예시 : client에서 특정 유저(나) 정보를 업데이트하고자 "updateUser" 요청을 서버에 보냄
 * server는 "updateUser" 함수를 호출해 client에서 받은 정보로 해당 유저(나)의 정보를 업데이트
 */
const updateUser = async (req, res) => {
  // 내 정보를 업데이트 할꺼야
  const userId = req.params.userId;
  // 바꿀 nick 입력
  const newNick = req.body.nick;
  try {
    // 바꿀 nick을 userModel에서 찾아. 예를 들어 downy 넣었는데 어? 그런데 (나)userId가 다르네? 이건 누가 쓰고 있단 말인거잖음
    const nickCheck = await userModel.findOne({ nick: newNick });
    if (nickCheck && nickCheck._id.toString() !== userId) {
      return res.status(400).json("이미 사용중 입니다");
    }
    // 중복 없다면
    const update = await userModel.updateOne(
      { _id: userId },
      { $set: { nick: newNick } }
    );
    // 업뎃 성공? 실패?
    if (update.nModified === 1) {
      res.status(400).json("유저 정보 업데이트 실패");
    } else {
      res.status(200).json("유저 정보 업데이트 성공");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * follow
 * 역활 : 팔로우
 * 구현 :
 * 사용 예시 :
 *
 */
const follow = async (req, res) => {
  try {
    const userId = req.user._id; // 유저 - 나
    const followedUserId = req.params.userId; // 선택한 유저

    const followRelationship = await followModel.findOne({
      follower: userId,
      following: followedUserId,
    });

    if (!followRelationship) {
      const newFollow = new followModel({
        follower: userId,
        following: followedUserId,
      });
      await newFollow.save();

      const user = await userModel.findById(userId);
      const followedUser = await userModel.findById(followedUserId);

      res
        .status(200)
        .json(`${user.nick}님이 ${followedUser.nick}님을 팔로우 합니다.`);
    } else {
      return res.status(400).json("이미 팔로우한 사용자입니다.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 선택한 유저를 언팔 할꺼임
const unfollow = async (req, res) => {
  try {
    const userId = req.user._id; // 유저 - 나
    const followedUserId = req.params.userId; // 선택한 유저

    const followRelationship = await followModel.findOne({
      follower: userId,
      following: followedUserId,
    });

    if (followRelationship) {
      await followModel.deleteOne({ _id: followRelationship._id });

      const user = await userModel.findById({ _id: userId });
      const unfollowedUser = await userModel.findById({ _id: followedUserId });

      res
        .status(200)
        .json(`${user.nick}님이 ${unfollowedUser.nick}님을 언팔로우 합니다.`);
    } else {
      // 팔로우 관계가 없는 경우
      return res.status(400).json("이미 언팔로우한 사용자입니다.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { findUser, getUsers, updateUser, follow, unfollow };
