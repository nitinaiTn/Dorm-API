const mysql = require('../config/db')

let Property = function (property) {
  this.property_id = property.property_id;
  this.owner_id = property.owner_id;
  this.address = property.address;
  this.number_of_floors = property.number_of_floors;
  this.number_of_rooms = property.number_of_rooms;
  this.meter_state = property.meter_state;
  this.Unit_bath_water = property.Unit_bath_water;
  this.Unit_bath_elect = property.Unit_bath_elect;
  this.user_id = property.user_id;
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

Property.create = function (owner_id, address, number_of_floors, number_of_rooms, result) {
  mysql.query("insert into Properties (owner_id, address, number_of_floors, number_of_rooms) values (?,?,?,?)", [owner_id, address, number_of_floors, number_of_rooms]
    , function (err, res) {
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
  mysql.query("update Properties set owner_id=?,address=?,number_of_floors=?,number_of_rooms=?, meter_state=?,Unit_bath_water=?, Unit_bath_elect=?  where property_id = ?",
    [property.owner_id, property.address, property.number_of_floors, property.number_of_rooms, property.meter_state, property.Unit_bath_water, property.Unit_bath_elect, property_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
};

Property.findRoomAndPropertyAdmin= function ( result) {
  mysql.query("SELECT * FROM Properties p join Rooms r on p.property_id  = r.property_id ", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Property.findRoomAndPropertyuser= function (user_id, result) {
  mysql.query("SELECT * FROM Properties p join Rooms r on p.property_id  = r.property_id  WHERE r.user_id  = ? ", user_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Property;

