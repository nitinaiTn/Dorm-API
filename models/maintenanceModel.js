const mysql = require('../config/db')
var futureDate = new Date()
futureDate.setTime(futureDate.getTime() + 3600 * 1000 * 7);
var Stringsdate = futureDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')

let MaintenanceRequest = function (request) {
  this.request_id = request.request_id;
  this.user_id = request.user_id;
  this.property_id = request.property_id;
  this.room_id = request.room_id;
  this.request_text = request.request_text;
  this.request_status = "no open";
  this.date_created = Stringsdate;
};

MaintenanceRequest.findAll = function (result) {
  mysql.query("select m.request_id, m.user_id ,m.property_id, m.room_id, m.request_text, m.request_status, m.date_created, u.name, u.lastName from Maintenance_Requests m join Users u on m.user_id = u.user_id", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Maintenance Requests : ", res);
      result(null, res);
    }
  });
};


MaintenanceRequest.findById = function (id, result) {
  mysql.query("Select * from Maintenance_Requests where request_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
MaintenanceRequest.findbyUserId = function (id, result) {
  mysql.query("Select * from Maintenance_Requests where user_id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

MaintenanceRequest.create = function (newRequest, result) {
  mysql.query("INSERT INTO Maintenance_Requests set ?", newRequest, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

MaintenanceRequest.delete = function (id, result) {
  mysql.query("DELETE FROM Maintenance_Requests WHERE request_id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

MaintenanceRequest.update = function (id, request, result) {
  mysql.query(
    "UPDATE Maintenance_Requests SET request_id=?, user_id=?, property_id=?, room_id=?, request_text=?, request_status=?, date_created=? WHERE request_id = ?",
    [request.request_id, request.user_id, request.property_id, request.room_id, request.request_text, request.request_status, request.date_created, id],
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

module.exports = MaintenanceRequest;