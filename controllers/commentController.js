const Comment = require("../models/commentModel")

exports.findAll = function (req, res) {
  Comment.findAll(function (err, comment) {
    if (err) res.send(err);
    res.json(comment);
  });
};

exports.findByPostId = function (req, res) {
  Comment.findByPostId(req.params.post_id, function (err, comment) {
    if (err) res.send(err);
    res.json(comment);
  });
};

exports.create = function (req, res) {
  const new_comment = new Comment(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Comment.create(new_comment, function (err, comment) {
      if (err) res.send(err);
      res.json({
        data: comment,
      });
    });
  }
};

exports.delete = function (req, res) {
    Comment.delete(req.params.comment_id, function (err, comment) {
    if (err) res.send(err);
    res.json({ message: "Comment successfully deleted" });
    });
};
    
exports.update = function (req, res) {
    Comment.update(req.params.comment_id, new Comment(req.body), function (err, comment) {
    if (err) res.send(err);
    res.json({ message: "Comment successfully updated" });
    });
};