const mysql = require('../config/db')

let User = function (user) {
  this.user_id = user.user_id;
  this.name = user.name;
  this.password = user.password;
};

User.findAll = function (result) {
  mysql.query("Select * from Users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("employees : ", res);
      result(null, res);
    }
  });
};

User.findById = function (id, result) {
  mysql.query("Select * from Users where user_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.create = function (newEmp, result) {
  mysql.query("INSERT INTO Users set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

module.exports = User;