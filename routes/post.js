let express = require("express")
let router = express.Router()
let Post = require("../models/post")
let User = require("../models/user")

router.get("/new", (req,res) => {
  res.render("posts/new.handlebars")
})

router.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(err) {
      res.render("posts/new.handlebars", {error: err.message})
    }
    if(!user) {
      res.render("posts/new.handlebars", {error: "No user with given username exists"})
    }
    else {
      let post = new Post( {
        title: req.body.title,
        content: req.body.content,
        author: user._id
      })
      post.save((err, post) => {
        if(err) return res.render("posts/new.handlebars", {error: err.message})
        return res.redirect(`/posts/${post._id}`)
      })
    }
  })  
})

router.get("/:id", (req,res) => {
  Post.findById(req.params.id).populate("author").exec((err, post) => {
    if(err) res.render("posts/show.handlebars", {error: err})
    if(!post) res.render("posts/show.handlebars", {error: "Post doesn't exist"})
    res.render("posts/show.handlebars", {post: post})
  })
})

module.exports = router