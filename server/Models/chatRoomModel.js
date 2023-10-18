const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatRoomModel = new Schema(
  {
    title: {
      type: String,
    },
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatRoom", chatRoomModel);
