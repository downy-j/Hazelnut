const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentModel = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentModel);
