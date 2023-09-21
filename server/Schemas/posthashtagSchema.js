const mongoose = require("mongoose");

const posthashtagSchema = new mongoose.Schema(
  {
    hashtagId: {
      type: mongoose.Types.ObjectId,
      ref: "Hashtag",
      required: true,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PostHahtag", posthashtagSchema);
