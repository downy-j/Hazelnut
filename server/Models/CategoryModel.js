const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categoryModel = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    posts: [
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

module.exports = mongoose.model("Category", categoryModel);
