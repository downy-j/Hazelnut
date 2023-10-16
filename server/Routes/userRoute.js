const express = require("express");
const {
  findUser,
  getUsers,
  updateUser,
  follow,
  unfollow,
} = require("../Controllers/userController");

const router = express.Router();

router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.patch("/:userId/update", updateUser);
router.post("/follow/:id", follow);
router.delete("/unfollow/:id", unfollow);

module.exports = router;
