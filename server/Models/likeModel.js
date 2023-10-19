const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const likeModel = new Schema(
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
      enum: ["like", null],
      default: null,
      require: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeModel);
