const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const likeDislikeModel = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    type: {
      type: String,
      enum: ["like", "dislike"],
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LikeDislike", likeDislikeModel);
