let mongoose = require("mongoose")
let Schema = mongoose.Schema

let Post = new Schema({
  title: {
    type: String,
    required: true
  },
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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true
  }]
})

module.exports = db.model("Post", Post)