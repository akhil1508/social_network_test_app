let mongoose = require("mongoose")
let Schema = mongoose.Schema

let Comment = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true
  }],
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
})

module.exports = db.model("Comment", Comment)