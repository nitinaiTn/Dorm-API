const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('./config/db')
const emailSend = require('./utils/sendEmailScript')

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "HEAD", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const loginRoute = require('./routes/loginRoute')
const UserRoute = require("./routes/userRoute")
const LeaseRoute = require('./routes/leaseRoute')
const UtilityRoute = require('./routes/utilityRoute')
const PropertyRoute = require('./routes/propertyRoute')
const MaintenanceRoute = require('./routes/maintenanceRoute')
const PostRoute = require('./routes/postRoute')
const CommentRoute = require('./routes/commentRoute')
const RoomsRoute = require('./controllers/roomController')

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.use('/api/login', loginRoute)
app.use("/api/user", UserRoute)
app.use('/api/lease', LeaseRoute)
app.use('/api/utility', UtilityRoute)
app.use('/api/property', PropertyRoute)
app.use('/api/maintenance', MaintenanceRoute)
app.use('/api/post', PostRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/room', RoomsRoute)

app.listen(process.env.PORT || 3000, function() {
  console.log("server listening on port 3000")
})

// Export the Express API
module.exports = app;