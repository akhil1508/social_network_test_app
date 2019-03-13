let express = require("express")
let router = express.Router()
let Post = require("../models/post")
let User = require("../models/user")
let Comment = require("../models/comment")

router.get("/new", (req, res) => {
  res.render("posts/new.handlebars")
})

router.post("/", (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) {
      res.render("posts/new.handlebars", {
        error: err.message
      })
    }
    if (!user) {
      res.render("posts/new.handlebars", {
        error: "No user with given username exists"
      })
    } else {
      let post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: user._id
      })
      post.save((err, post) => {
        if (err) return res.render("posts/new.handlebars", {
          error: err.message
        })
        return res.redirect(`/posts/${post._id}`)
      })
    }
  })
})

router.get("/:postId", (req, res) => {
  Post.findById(req.params.postId).populate("author").populate("likes").exec((err, post) => {
    if (err) res.render("posts/show.handlebars", {
      error: err
    })
    if (!post) res.render("posts/show.handlebars", {
      error: "Post doesn't exist"
    })
    Comment.find({
      post: post._id
    }).populate("author").exec((err, comments) => {
      res.render("posts/show.handlebars", {
        post: post,
        comments: comments
      })
    })
  })
})

router.use("/:postId/comments/", require("./comment"))

router.post("/:postId/likes/", (req, res) => {
  User.findOne({username: req.body.username}).exec(
    (err, user) => {
      if (err) res.render("posts/show.handlebars", {
        likeError: err
      })
      if (!user) res.render("posts/show.handlebars", {
        likeError: "No user with given username"
      })
      else {
        Post.findById(req.params.postId).populate("likes").exec((err, post) => {
          post.likes.push(user)
          post.save((err, post) => {
            if(err) res.render("posts/show.handlebars", {likeError: err})
            res.redirect(`/posts/${post._id}`)
          })
        })
      }
    }
  )
})

module.exports = router