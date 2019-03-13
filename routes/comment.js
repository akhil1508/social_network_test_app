let express = require("express")
let router = express.Router({
  mergeParams: true
})
let Post = require("../models/post")
let User = require("../models/user")
let Comment = require("../models/comment")


router.post("/", (req, res) => {
  console.log(req.params.postId)
  Post.findOne({
    _id: req.params.postId
  }).populate("author").exec((err, post) => {
    if (err) {
      return res.render(`posts/show.handlebars`, {
        error: err.message
      })
    }
    if (!post) {
      return res.render(`posts/show.handlebars`, {
        error: "No such post exists"
      })
    } else {
      Comment.find({
        post: post._id
      }).populate("author").exec((err, comments) => {
        User.findOne({
          username: req.body.username
        }, (err, user) => {
          if (err) {
            return res.render(`posts/show.handlebars`, {
              post: post,
              comments: comments,
              commentError: err.message
            })
          }
          if (!user) {
            return res.render(`posts/show.handlebars`, {
              post: post,
              comments: comments,
              commentError: "No user with given username exists"
            })
          }
          let comment = new Comment({
            content: req.body.content,
            author: user._id,
            post: post._id
          })
          comment.save((err, comment) => {
            if (err) return res.render(`posts/show.handlebars`, {
              post: post,
              comments: comments,
              commentError: err.message
            })
            return res.redirect(`/posts/${post._id}`)
          })
        })
      })
    }
  })
})

module.exports = router