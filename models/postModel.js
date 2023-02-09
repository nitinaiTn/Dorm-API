const mysql = require('../config/db')

let Post = function (post) {
  this.post_id = post.post_id;
  this.user_id = post.user_id;
  this.post_title = post.post_title;
  this.post_text = post.post_text;
  this.date_created = post.date_created;
};

Post.findAll = function (result) {
  mysql.query("select * from Posts", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Posts : ", res);
      result(null, res);
    }
  });
};

Post.findByUserId = function (user_id, result) {
  mysql.query("Select * from Posts where user_id = ? ", user_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Post.create = function (newPost, result) {
//   mysql.query("INSERT INTO Posts set ?",newPost, function (err, res) {
//     if (err) {
//     console.log("error: ", err);
//     result(err, null);
//     } else {
//     console.log(res.insertId);
//     result(null, res.insertId);
//     }
//     });
//     };
    
    Post.delete = function (post_id, result) {
    mysql.query("DELETE FROM Posts WHERE post_id = ?", [post_id], function (err, res) {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    } else {
    result(null, res);
    }
    });
    };
    
Post.update = function (post_id, user_id, post_title, post_text, date_created, result) {
  mysql.query("UPDATE Posts SET user_id=?,post_title=?,post_text=?,date_created=? WHERE post_id = ?",
    [user_id, post_title, post_text, date_created, post_id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);}
      else {
        console.log(res.body)
        result(null, res);
      }
    }
  );
};

Post.getJoin = function (result) {
    mysql.query("select p.post_id, p.user_id ,p.post_title, p.post_text, p.date_created, u.name from Posts p join Users u on p.user_id = u.user_id", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Posts : ", res);
        result(null, res);
      }
  });
};   

Post.create = function (user_id, post_title, post_text, date_created, result) {
  mysql.query("insert into Posts (user_id, post_title, post_text, date_created) values (?,?,?,?)",[user_id, post_title, post_text, date_created], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};



module.exports = Post;
    
    