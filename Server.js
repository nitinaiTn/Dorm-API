const express = require("express")
const cors = require('cors')
const app = express()
const connection = require("./config/db.js")


app.use(cors())
app.get('/',(req,res) =>{
  res.send('hello world')
})

app.get('/user', (req,res)=>{
  connection.query(
    'SELECT * FROM Users',
    function(err,result,fields){
      res.send(result)
    }
  )
})
// // connecting route to database
// app.use(function(req, res, next) {
//     req.con = con
//     next()
//   })

// // parsing body request
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // include router
// const userRouter = require("./routes/user")

// // routing
// app.use("/userdata", userRouter)

// starting server
app.listen(3000, function() {
  console.log("server listening on port 3000")
})