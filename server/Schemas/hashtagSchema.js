const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
  {
    title: {
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
