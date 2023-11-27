const userModel = require("../Models/userModel");
const postModel = require("../Models/postModel");

/**
 * searchPosts
 * 역활 : 게시물 검색하는 역할
 * 구현 : client로 부터 검색어 또는 필터 조건을 받아, 해당 조건에 맞는 게시물을 DB에서 찾아 client에 반환
 * 사용 예시 : 유저가 특정 키워드로 게시물을 검색하거나, 필터링해서 게시물을 조회하려 할 때, server에 "searchPosts" 요청
 */
const searchPosts = async (req, res) => {
  try {
    const result = req.body.postTitle; // 내가 입력한 값
    // 검색의 조건은 여러가지가 있을듯
    // 시간으로 검색 할수도 있고
    // 제목으로도 검색 할 수도 있고
    // 내용안에 포함된 글로도 검색 할 수 있고
    // 검색의 결과에 해당하는 건 노랑으로 색 칠하는거야
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * searchUsers
 * 역활 : 유저를 검색하는 역할
 * 구현 : client로 부터 유저명을 받아, 해당 조건에 맞는 유저를 DB에서 찾아 client에 반환
 * 사용 예시 : 유저가 특정 키워드로 게시물을 검색하거나, 필터링해서 게시물을 조회하려 할 때, server에 "searchUsers" 요청
 */
const searchUsers = async (req, res) => {
  try {
    const userNick = req.body.userNick; // 내가 입력한 값
    // 사용자 닉네임으로 가져올겨
    const result = await userModel.find({ nick: { $in: userNick } });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * searchTags
 * 역활 : 태그로 검색하는 역할
 * 구현 : client로 부터 태그값을 받아, 해당 조건에 맞는 게시물을 DB에서 찾아 client에 반환
 * 사용 예시 : 유저가 특정 키워드로 게시물을 검색하거나, 필터링해서 게시물을 조회하려 할 때, server에 "searchTags" 요청
 */
const searchTags = async (req, res) => {
  try {
    const hashTags = req.body.hashTags;

    const result = await postModel.find({ hashtags: { $in: hashTags } });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { searchPosts, searchUsers, searchTags };
