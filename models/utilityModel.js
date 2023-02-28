const mysql = require('../config/db')

let UtilityConsumption = function (utilityConsumption) {
  this.consumption_id = utilityConsumption.consumption_id;
  this.lease_id = utilityConsumption.lease_id;
  this.user_id = utilityConsumption.user_id;
  this.property_id = utilityConsumption.property_id;
  this.room_id = utilityConsumption.room_id;
  this.water_consumption = utilityConsumption.water_consumption;
  this.electricity_consumption = utilityConsumption.electricity_consumption;
  this.consumption_date = utilityConsumption.consumption_date;
  this.sumWater = utilityConsumption.sumWater;
  this.sumElec = utilityConsumption.sumElec;
};

var futureDate = new Date()
futureDate.setTime(futureDate.getTime() + 3600 * 1000 * 7);
var Stringsdate = futureDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')

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


UtilityConsumption.utilityConsumptionAdmin = function (result) {
  mysql.query("SELECT consumption_date, SUM(water_consumption) AS sumWater, SUM(electricity_consumption) AS sumElec FROM Utility_Consumption WHERE consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW() GROUP BY consumption_date", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Utility Consumption : ", res);
      result(null, res);
    }
  });
};

UtilityConsumption.utilityConsumptionByUserId = function (userid, result) {
  mysql.query("SELECT water_consumption,electricity_consumption,consumption_date  FROM  Utility_Consumption uc WHERE uc.user_id  = ?", userid, function (err, res) {
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


UtilityConsumption.updateWater_consumtion = function (room_id,water_consumptions,results) {
  mysql.query(
    "SELECT * from Utility_Consumption uc WHERE uc.consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() and uc.room_id = ?",
    room_id,
    function (err,result) {
      if (err) {
        console.log("error: ", err);
        results(err, null);
      } else {
       console.log(result[0].water_meterdial_Current);
       const resultwater_consumptions = result[0].water_meterdial_Current - water_consumptions; 
        mysql.query(
          "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,consumption_date=?,water_consumption=?,water_meterdial_Current=? WHERE consumption_id = ?",
          [ result[0].lease_id,result[0].user_id, result[0].property_id, result[0].room_id,result[0].consumption_date ,resultwater_consumptions,water_consumptions, result[0].consumption_id],
        );
        results(null, result);
      }
    }
  );
};


UtilityConsumption.updateElect_consumtion = function (room_id,Elect_consumptions,results) {

  mysql.query(
    "SELECT * from Utility_Consumption uc WHERE uc.consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() and uc.room_id = ?",
    room_id,
    function (err,result) {
      if (err) {
        console.log("error: ", err);
        results(err, null);
      } else {
       console.log(result[0].water_meterdial_Current);
       const resultElect_consumptions = result[0].elect_meterdial_Current - Elect_consumptions; 
        mysql.query(
          "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,consumption_date=?,electricity_consumption=? ,elect_meterdial_Current=? WHERE consumption_id = ?",
          [ result[0].lease_id,result[0].user_id, result[0].property_id, result[0].room_id,result[0].consumption_date ,resultElect_consumptions, Elect_consumptions,result[0].consumption_id],
        );
        results(null, result);
      }
    }
  );

};

module.exports = UtilityConsumption;