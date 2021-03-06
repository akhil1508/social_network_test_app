let express = require("express")
let router = express.Router()
let User = require("../models/user")

router.get("/new", (req, res) => {
  res.render("users/new.handlebars")
})

router.post("/", (req,res) => {
  let username = req.body.username
  let user = new User({
    username: username
  })
  user.save((err, user) => {
    if(err) return res.render("users/new.handlebars", {error: err.message})
    return res.redirect(`/users/${user._id}`)
  })
})

router.get("/:id", (req,res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) return res.render("users/show.handlebars", {error: err})
    if(!user) return res.render("users/show.handlebars", {error: "User doesn't exist"})
    res.render("users/show.handlebars", {user: user})
  })
})

router.get("/", (req,res) => {
  User.find({}, (err, users) => {
    if(err) {
      req.flash(err)
      return res.render("users/index.handlebars")
    }
    return res.render("users/index.handlebars", {users: users})
  })
})

module.exports = router