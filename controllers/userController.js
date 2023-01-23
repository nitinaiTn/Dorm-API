// this code is object literal pattern
const User = require("../models/userModel")

const userController = {
  findAll: function(req, res) {
    User.findAll(function (err, user) {
      console.log("controller");
      if (err) res.send(err);
      console.log("res", user);
      res.send(user);
    });
  },

  findById: function(req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  },

  create: function(req, res) {
    const new_user = new User(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      User.create(new_user, function (err, user) {
        if (err) res.send(err);
        res.json({
          data: user,
        });
      });
    }
  },

  delete: function(req, res) {
    User.delete(req.params.id, function (err, user) {
      if (err) res.send(err);
      res.json({ message: "User successfully deleted" });
    });
  },

  update: function(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      User.update(req.params.id, new Employee(req.body), function (err, user) {
        if (err) res.send(err);
        res.json({ message: "User successfully updated" });
      });
    }
  }
};

module.exports = userController;