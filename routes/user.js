let express = require("express")
let router = express.Router()
let User = require("../models/user")

router.get("/new", (req, res) => {
  res.render("users/new.handlebars")
})

router.post("/", (req,res) => {
  let username = req.body.username
  console.log(req.body)
  let user = new User({
    username: username
  })
  user.save((err, user) => {
    if(err) return res.render("users/new.handlebars", {error: err.message})
    return res.render("users/show.handlebars", {user: user})
  })
})

module.exports = router