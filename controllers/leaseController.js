const Lease = require("../models/leaseModel")

exports.findAll = function (req, res) {
  Lease.findAll(function (err, lease) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", lease);
    res.send(lease);
  });
};

exports.findByUserId = function (req, res) {
  Lease.findByUserId(req.params.user_id, function (err, lease) {
    if (err) res.send(err);
    res.json(lease);
  });
};

exports.create = function (req, res) {
  const new_lease = new Lease(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Lease.create(new_lease, function (err, lease) {
      if (err) res.send(err);
      res.json({
        data: lease,
      });
    });
  }
};

exports.delete = function (req, res) {
  Lease.delete(req.params.lease_id, function (err, lease) {
    if (err) res.send(err);
    res.json({ message: "Lease successfully deleted" });
  });
};

exports.update = function (req, res) {
  Lease.update(req.params.lease_id, new Lease(req.body), function (err, lease) {
    if (err) res.send(err);
    res.json({ message: "Lease successfully updated" });
  });
};