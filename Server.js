const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('./config/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const loginRoute = require('./routes/loginRoute')
const UserRoute = require("./routes/userRoute")
const MaintenanceRoute = require('./routes/maintenanceRoute')
const LeaseRoute = require('./routes/leaseRoute')
const UtilityRoute = require('./routes/utilityRoute')
const PropertyRoute = require('./routes/propertyRoute')
const PostRoute = require('./routes/postRoute')
const CommentRoute = require('./routes/commentRoute')

app.use('/api/login', loginRoute)
app.use("/api/user", UserRoute)
app.use('/api/maintenance', MaintenanceRoute)
app.use('/api/lease', LeaseRoute)
app.use('/api/utility', UtilityRoute)
app.use('/api/property', PropertyRoute)
app.use('/api/post', PostRoute)
app.use('/api/comment', CommentRoute)



app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server listening on port 3000")
})

// Export the Express API
module.exports = app;