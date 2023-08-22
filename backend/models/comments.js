const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now() },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [
    {
      reply: { type: String, required: true },
      replier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now() },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],
});

module.exports = mongoose.model("Comment", commentSchema);
