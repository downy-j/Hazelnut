const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    commenter: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
      default: "",
    },
    comment: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", commentSchema);
