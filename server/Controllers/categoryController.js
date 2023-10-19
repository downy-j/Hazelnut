const categoryModel = require("../Models/categoryModel");
/**
 * createCategory
 * 역활 : 새 카테고리를 생성, DB에 저장
 * 구현 : client로 부터 전달된 카테고리 정보를 사용해 새 카테고리를 생성, DB에 저장
 * 사용 예시 : 유저가 새 카테고리를 생성하고, 카테고리 명과 설명 입력한 후, server에 "createCategory" 요청 보냄
 */
const createCategory = async (req, res) => {
  try {
    const categorys = await new categoryModel({
      category: req.body.category, //직접입력이다
      description: req.body, // 꼭쓸필욘 없는 설명이다
      posts: req.body, // 이거 배열로 들어갈건데..
    });
    const saveCategorys = await categorys.save();
    res.status(200).json(saveCategorys);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * getCategories
 * 역활 : 저장된 전 카테고리를 검색, client에 반환
 * 구현 : DB에서 전 카테고리를 조회, 조회된 카테고리 목록을 client에 반환
 * 사용 예시 : client가 앱에서 전 카테고리 목록을 조회 할 때, server에 "getCategories" 요청을 보냅
 */
const getCategories = async (req, res) => {
  try {
    // 1. DB에서 모든 카테고리를 조회
    const categories = await categoryModel.find();

    // 2. 조회된 카테고리 목록을 클라이언트에 반환
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createCategory, getCategories };
