const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hashtagsModel = new Schema(
  {
    hashtags: {
      type: String,
      required: true,
    },
    postId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", hashtagsModel);
