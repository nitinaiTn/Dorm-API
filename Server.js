const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const UserRoute = require("./routes/user");

app.use("/api/user", UserRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(3000, function() {
  console.log("server listening on port 3000")
})