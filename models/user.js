let mongoose = require("mongoose")
let Schema = mongoose.Schema

let User = new Schema({
  username: {
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
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }]
})

module.exports = db.model("User", User)