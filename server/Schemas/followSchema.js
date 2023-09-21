const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    followingId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
