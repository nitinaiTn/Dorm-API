const mysql = require('../config/db')

let User = function (user) {
  this.user_id = user.user_id;
  this.name = user.name;
  this.password = user.password;
};
// 모든 사용자 검색
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
// 특정 사용자 검색
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

module.exports = User;