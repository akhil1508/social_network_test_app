let express = require("express")
let router = express.Router({
  mergeParams: true
})
let Post = require("../models/post")
let User = require("../models/user")
let Comment = require("../models/comment")


router.get("/:commentId/reply", (req, res) => {
  Comment.findById(req.params.commentId).populate("author").populate("post").populate("replies").exec((err, comment) => {
    return res.render(`comments/reply.handlebars`, {
      comment: comment
    })
  })
})

router.post("/:commentId/likes", (req, res) => {
  User.findOne({username: req.body.username}).exec(
    (err, user) => {
      if (err) {
        req.flash("Error while liking comment: " + err)
        return res.redirect(`posts/${req.params.postId}`)
      }
        if (!user){
          req.flash("No user with given username found.") 
          return res.redirect(`posts/${req.params.postId}`)
    }
      else {
        Comment.findById(req.params.commentId).populate("likes").exec((err, comment) => {
          comment.likes.push(user._id)
          comment.save((err, comment) => {
            if(err) {req.flash("Error while liking comment")}
            req.flash(`Comment liked by ${user.username}`)
            res.redirect(`/posts/${comment.post}`)
          })
        })
      }
    }
  )
})


router.post("/:commentId", (req, res) => {
  Comment.findById(req.params.commentId).populate("replies").exec((err, comment) => {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      let reply = new Comment({
        author: user._id,
        content: req.body.content,
        post: req.params.postId,
        replyTo: comment._id
      })
      reply.save((err, reply) => {
        res.redirect(`/posts/${req.params.postId}`)
      })
    //  comment.replies.push(reply)
     // comment.save((err, comment) => {
       // res.redirect(`/posts/${req.params.postId}`)
     // })
    })
  })
})

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