const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatRoomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
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

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
