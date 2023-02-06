const Login = require("../models/loginModel");

exports.login = function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ error: true, message: "Please provide username and password" });
  } else {
    Login.findByEmail(req.body.username, function (err, user) {
      if (err) {
        res.status(500).send({ error: true, message: "Error retrieving user" });
      } else if (!user) {
        res.status(401).send({ error: true, message: "Invalid username or password" });
      } else {
        if (req.body.password === user[0].password) {
          res.status(200).send({ message: "Successfully logged in" });
        } else {
          res.status(401).send({ error: true, message: "Invalid username or password Form password" });
        }
      }
    });
  }
};