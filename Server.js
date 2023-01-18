const express = require("express")
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const connection = require("./config/db.js")

app.use(bodyParser.json())
app.use(body.bodyParser.urlencode({extended:true}))
app.use(cors())

// starting server
app.listen(3000, function() {
  console.log("server listening on port 3000")
})

// app.get('/',(req,res) =>{
//   res.send('hello world')
// })

// app.get('/user', (req,res)=>{
//   connection.query(
//     'SELECT * FROM Users',
//     function(err,result,fields){
//       res.send(result)
//     }
//   )
// })