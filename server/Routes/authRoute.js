const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../Controllers/authController");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/register", isNotLoggedIn, registerUser);
router.post("/login", isNotLoggedIn, loginUser);
router.post("/logout", isLoggedIn, logoutUser);

module.exports = router;
