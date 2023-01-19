const mysql = require("../config/db");

let Login = function (user) {
  this.username = user.username;
  this.password = user.password;
};

Login.findByEmail = function (username, result) {
  mysql.query("SELECT * FROM Users WHERE username = ?", username, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Login;