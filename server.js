let express = require("express")
let path = require("path")
let app = express()
let exphbs = require("express-handlebars")
let mongoose = require("mongoose")
let morgan = require("morgan")
let session = require('express-session');
let cookieParser = require('cookie-parser');

app.use(cookieParser('secret'));
app.use(session());
app.use(require('flash')())

app.use(morgan("tiny"))
let bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set("dburi", "mongodb://localhost:27017/social_network")

global.db = (global.db ? global.db : mongoose.createConnection(app.settings.dburi, { useNewUrlParser: true }))

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.get("/", (req,res) => {
  res.render("index.handlebars")
})
app.use(express.static(path.join(__dirname, "public")))

app.use("/users", require("./routes/user"))
app.use("/posts", require("./routes/post"))

app.listen(4000)