const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
  {
    hashtag: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hashtag", hashtagSchema);
