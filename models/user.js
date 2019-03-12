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
  }
})

module.exports = db.model("User", User)