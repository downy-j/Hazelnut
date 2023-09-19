const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commenter: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    commenterName: {
      type: String,
      ref: "User",
      default: "",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", commentSchema);
