const express = require("express")
const app = express()
const con = require("./config/db.js")

// connecting route to database
app.use(function(req, res, next) {
    req.con = con
    next()
  })

// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// include router
const userRouter = require("./routes/user")

// routing
app.use("/userdata", userRouter)

// starting server
app.listen(3000, function() {
  console.log("server listening on port 3000")
})