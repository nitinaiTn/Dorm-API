const Login = require("../models/loginModel");
const jwt = require('jsonwebtoken');


exports.login = function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ error: true, message: "Please provide username and password" });
  } else {
    
    Login.findByEmail(req.body.username,function (err, user) {
      if (err) {
        res.status(500).send({ error: true, message: "Error retrieving user" });
      } else if (!user) {
        res.status(401).send({ error: true, message: "Invalid username or password" });
      } else {
        if (req.body.password === user[0].password) {
          const token = jwt.sign(
            {username: user[0].username},
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          ); 
          
          res.status(200).send({ user:user[0],message: "Successfully logged in",
          token});
        } else {
          res.status(401).send({ error: true, message: "Invalid username or password Form password" });
        }
      }
    });
  }
};


exports.loginAuthen = function (req, res) {
  const token = req.headers.authorization.split('');
  const decode = jwt.verify(token, process.env.TOKEN_KEY);
  res.send(decode);
};