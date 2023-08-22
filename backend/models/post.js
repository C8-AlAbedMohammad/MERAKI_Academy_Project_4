const mongoose = require("mongoose");

const post = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String, },

  username: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  dateOfPublish:{type:Date,default:Date.now()},
  likes:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Posts", post);
