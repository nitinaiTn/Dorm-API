const Post = require("../models/postModel")

exports.findAll = function (req, res) {
  Post.findAll(function (err, post) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", post);
    res.send(post);
  });
};

exports.findByUserId = function (req, res) {
  Post.findByUserId(req.params.user_id, function (err, post) {
    if (err) res.send(err);
    res.json(post);
    });
    };
    
    exports.create = function (req, res) {
    const new_post = new Post(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
    .status(400)
    .send({ error: true, message: "Please provide all required field" });
    } else {
    Post.create(new_post, function (err, post) {
    if (err) res.send(err);
    res.json({
    data: post,
    });
    });
    }
    };
    
    exports.delete = function (req, res) {
    Post.delete(req.params.post_id, function (err, post) {
    if (err) res.send(err);
    res.json({ message: "Post successfully deleted" });
    });
    };
    
    exports.update = function (req, res) {
    Post.update(req.params.post_id, new Post(req.body), function (err, post) {
    if (err) res.send(err);
    res.json({ message: "Post successfully updated" });
    })};

exports.testJoinPost = function (req, res) {
  // const new_post = new Post(req.body);
  //     //handles null error
  let user_id = req.body.user_id
  let post_title = req.body.post_title
  let post_text = req.body.post_text
  let date_created = req.body.date_created
  
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
    } else {
    Post.testJoinPost(user_id, post_title, post_text, date_created, function (err, post) {
    if (err) res.send(err);
      res.json({
      data: post,
      });
    });
  }
};