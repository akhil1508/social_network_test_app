let express = require("express")
let path = require("path")
let app = express()
let exphbs = require("express-handlebars")
let mongoose = require("mongoose")

global.db = (global.db ? global.db : mongoose.createConnection(app.settings.dburi))

app.set("dburi", "mongodb://localhost:27017/social_network")

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(express.static(path.join(__dirname, "public")))

app.listen(4000)