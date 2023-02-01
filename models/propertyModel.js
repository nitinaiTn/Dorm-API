const mysql = require('../config/db')

let Property = function (property) {
  this.property_id = property.property_id;
  this.owner_id = property.owner_id;
  this.address = property.address;
  this.number_of_floors = property.number_of_floors;
  this.number_of_rooms = property.number_of_rooms;
};

Property.findAll = function (result) {
  mysql.query("Select * from Properties", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Properties : ", res);
      result(null, res);
    }
  });
};

Property.findByOwnerId = function (owner_id, result) {
  mysql.query("Select * from Properties where owner_id = ? ", owner_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Property.create = function (newProperty, result) {
  mysql.query("insert into Properties (owner_id, address, number_of_floors, number_of_rooms) values ?", newProperty, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
    
    Property.delete = function (property_id, result) {
    mysql.query("DELETE FROM Properties WHERE property_id = ?", [property_id], function (err, res) {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    } else {
    result(null, res);
    }
    });
    };
    
    Property.update = function (property_id, property, result) {
    mysql.query(
    "UPDATE Properties SET owner_id=?,address=?,number_of_floors=?,number_of_rooms=? WHERE property_id = ?",
    [property.owner_id, property.address, property.number_of_floors, property.number_of_rooms, property_id],
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
    
module.exports = Property;
    
    