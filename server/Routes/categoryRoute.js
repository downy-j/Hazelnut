const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../Controllers/categoryController");

const router = express.Router();

router.post("/");
router.get("/gets/category", getCategories);

module.exports = router;
