const Property = require("../models/propertyModel")

exports.findAll = function (req, res) {
  Property.findAll(function (err, property) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", property);
    res.send(property);
  });
};

exports.findByOwnerId = function (req, res) {
  Property.findByOwnerId(req.params.owner_id, function (err, property) {
    if (err) res.send(err);
    res.json(property);
  });
};

exports.create = function (req, res) {
  const new_property = new Property(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Property.create(new_property, function (err, property) {
      if (err) res.send(err);
      res.json({
        data: property,
      });
    });
  }
};

exports.delete = function (req, res) {
    Property.delete(req.params.property_id, function (err, property) {
    if (err) res.send(err);
    res.json({ message: "Property successfully deleted" });
    });
};
    
exports.update = function (req, res) {
    Property.update(req.params.property_id, new Property(req.body), function (err, property) {
    if (err) res.send(err);
    res.json({ message: "Property successfully updated" });
    });
};