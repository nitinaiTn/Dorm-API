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

// module.exports = {
//     get: function(con, callback) {
//       con.query("SELECT * FROM Users", callback)
//     },
  
//     getById: function(con, id, callback) {
//       con.query(`SELECT * FROM Users WHERE user_id = ${id}`, callback)
//     },
  
//     create: function(con, data, callback) {
//       con.query(
//         `INSERT INTO Users SET 
//         name = '${data.name}', 
//         password = '${data.password}'`,
//         callback
//       )
//     },
  
//     update: function(con, data, id, callback) {
//       con.query(
//         `UPDATE Users SET 
//         name = '${data.name}', 
//         password = '${data.password}' 
//         WHERE user_id = ${id}`,
//         callback
//       )
//     },
  
//     destroy: function(con, id, callback) {
//       con.query(`DELETE FROM Users WHERE user_id = ${id}`, callback)
//     }
//   }