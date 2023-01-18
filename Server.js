const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const connection = require("./config/db.js")

app.use(bodyParser.json())
app.use(body.bodyParser.urlencode({extended:true}))
app.use(cors())

const UserRoute = require("./routes/user.routes");

app.use("/api/user", UserRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(3000, function() {
  console.log("server listening on port 3000")
})