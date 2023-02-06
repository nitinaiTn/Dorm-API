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
  // const new_property = new Property(req.body);
  let owner_id = req.body.owner_id
  let address = req.body.address
  let number_of_floors = req.body.number_of_floors
  let number_of_rooms = req.body.number_of_rooms

  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Property.create(owner_id, address, number_of_floors, number_of_rooms, function (err, property) {
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