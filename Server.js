const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const loginRoute = require('./routes/loginRoute')
const UserRoute = require("./routes/userRoute")
const MaintenanceRoute = require('./routes/maintenanceRoute')
const LeaseRoute = require('./routes/leaseRoute')
const UtilityRoute = require('./routes/utilityRoute')
const PropertyRoute = require('./routes/propertyRoute')

app.use('/api/login', loginRoute)
app.use("/api/user", UserRoute)
app.use('/api/maintenance', MaintenanceRoute)
app.use('/api/lease', LeaseRoute)
app.use('/api/utility', UtilityRoute)
app.use('/api/property', PropertyRoute)

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(3000, function() {
  console.log("server listening on port 3000")
})