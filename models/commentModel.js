const mysql = require('../config/db')

let Comment = function (comment) {
  this.comment_id = comment.comment_id;
  this.user_id = comment.user_id;
  this.post_id = comment.post_id;
  this.comment_text = comment.comment_text;
  this.date_created = comment.date_created;
};

Comment.findAll = function (result) {
  mysql.query("Select * from Comments", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("comments : ", res);
      result(null, res);
    }
  });
};

Comment.findByPostId = function (post_id, result) {
  mysql.query("Select * from Comments where post_id = ? ", post_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Comment.create = function (newComment, result) {
  mysql.query("INSERT INTO Comments set ?", newComment, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Comment.delete = function (comment_id, result) {
  mysql.query("DELETE FROM Comments WHERE comment_id = ?", [comment_id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Comment.update = function (comment_id, comment, result) {
  mysql.query(
    "UPDATE Comments SET user_id=?,post_id=?,comment_text=?,date_created=? WHERE comment_id = ?",
    [comment.user_id, comment.post_id, comment.comment_text, comment.date_created, comment_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Comment;