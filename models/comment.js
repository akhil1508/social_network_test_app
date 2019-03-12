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
  }
})

module.exports= db.model("Comment", Comment)