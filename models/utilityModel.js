const mysql = require('../config/db')

let UtilityConsumption = function (utilityConsumption) {
  this.consumption_id = utilityConsumption.consumption_id;
  this.lease_id = utilityConsumption.lease_id;
  this.user_id = utilityConsumption.user_id;
  this.property_id = utilityConsumption.property_id;
  this.room_id = utilityConsumption.room_id;
  this.month = utilityConsumption.month;
  this.year = utilityConsumption.year;
  this.water_consumption = utilityConsumption.water_consumption;
  this.electricity_consumption = utilityConsumption.electricity_consumption;
};

UtilityConsumption.findAll = function (result) {
  mysql.query("Select * from Utility_Consumption", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Utility Consumption : ", res);
      result(null, res);
    }
  });
};

UtilityConsumption.findByLeaseId = function (lease_id, result) {
  mysql.query("Select * from Utility_Consumption where lease_id = ? ", lease_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

UtilityConsumption.create = function (newUtilityConsumption, result) {
  mysql.query("INSERT INTO Utility_Consumption set ?", newUtilityConsumption, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

UtilityConsumption.delete = function (consumption_id, result) {
  mysql.query("DELETE FROM Utility_Consumption WHERE consumption_id = ?", [consumption_id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

UtilityConsumption.update = function (consumption_id, utilityConsumption, result) {
  mysql.query(
    "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,month=?,year=?,water_consumption=?,electricity_consumption=? WHERE consumption_id = ?",
    [utilityConsumption.lease_id, utilityConsumption.user_id, utilityConsumption.property_id, utilityConsumption.room_id, utilityConsumption.month, utilityConsumption.year, utilityConsumption.water_consumption, utilityConsumption.electricity_onsumption, consumption_id],
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

module.exports = UtilityConsumption;