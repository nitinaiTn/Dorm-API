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
  mysql.query("SELECT consumption_date, CAST(SUM(water_consumption) AS SIGNED) AS sumWater, CAST(SUM(electricity_consumption)AS SIGNED) AS sumElec FROM Utility_Consumption WHERE consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW() GROUP BY consumption_date", function (err, res) {
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

UtilityConsumption.utilityConsumptionByPropertyid = function (propertyid, result) {
  mysql.query("SELECT * from Utility_Consumption uc WHERE uc.consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() AND  uc.property_id = ?", propertyid, function (err, res) {
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


UtilityConsumption.updateWater_consumtion = function (room_id, water_consumptions, results) {
  var resultwater_consumptions;
  var check_update = false;
  mysql.query(
    "SELECT * from Utility_Consumption uc WHERE uc.consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 2 MONTH) AND NOW() and uc.room_id = ?",
    room_id,
    function (err, result) {
      if (err) {
        console.log("error: ", err);
        results(err, null);
      } else {

        if (result[1] != null) {
          console.log("เข้าไม่");
          if(water_consumptions.length == 4){
            console.log("เข้า4");
            check_update = true;
            if(result[0].water_meterdial_Current>=parseInt(water_consumptions)){
              console.log(resultwater_consumptions);
              console.log(result[0].water_meterdial_Current);
              console.log(water_consumptions);
             
              resultwater_consumptions = 10000 - result[0].water_meterdial_Current + parseInt(water_consumptions);
              console.log(resultwater_consumptions);
            }
            else{
              console.log("ปกติ1");
              resultwater_consumptions = water_consumptions - result[0].water_meterdial_Current;
            }
          }else if (water_consumptions.length == 7){
            check_update = true;
            console.log("เข้าเคส7");
            if(result[1].water_meterdial_Current>=parseInt(water_consumptions)){
              console.log("เข้า999999");
              resultwater_consumptions = 9999999 - result[0].water_meterdial_Current + parseInt(water_consumptions);
            }
            else{
              console.log("ปกติ2");
              resultwater_consumptions = water_consumptions - result[0].water_meterdial_Current;
            }
          }
          if(check_update){
            mysql.query(
              "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,consumption_date=?,water_consumption=?,water_meterdial_Current=? WHERE consumption_id = ?",
              [result[1].lease_id, result[1].user_id, result[1].property_id, result[1].room_id, result[1].consumption_date, resultwater_consumptions, water_consumptions, result[1].consumption_id],
            );
          }
          
          
        }else{    
          mysql.query(
            "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,consumption_date=?,water_consumption=?,water_meterdial_Current=? WHERE consumption_id = ?",
            [result[0].lease_id, result[0].user_id, result[0].property_id, result[0].room_id, result[0].consumption_date, resultwater_consumptions, water_consumptions, result[0].consumption_id],
          );
        }
        results(null, result);
      }
    }
  );
};


UtilityConsumption.updateElect_consumtion = function (room_id, Elect_consumptions, results) {
 var resultElect_consumptions;
 var check_update = false;
  mysql.query(
    "SELECT * from Utility_Consumption uc WHERE uc.consumption_date BETWEEN DATE_SUB(NOW(), INTERVAL 2 MONTH) AND NOW() and uc.room_id = ?",
    room_id,
    function (err, result) {
      if (err) {
        console.log("error: ", err);
        results(err, null);
      } else {

        if (result[1] != null) {

          console.log("เข้าไม่");
          if(Elect_consumptions.length == 4){
            console.log("เข้า4");
            check_update = true;
            if(result[0].elect_meterdial_Current>=parseInt(Elect_consumptions)){
              console.log(resultElect_consumptions);
              console.log(result[0].elect_meterdial_Current);
              console.log(Elect_consumptions);
             
              resultElect_consumptions = 10000 - result[0].elect_meterdial_Current + parseInt(Elect_consumptions);
              console.log(resultElect_consumptions);
            }
            else{
              console.log("ปกติ1");
              resultElect_consumptions = Elect_consumptions - result[0].elect_meterdial_Current;
            }
          }else if (Elect_consumptions.length == 7){
            check_update = true;
            console.log("เข้าเคส7");
            if(result[1].elect_meterdial_Current>=parseInt(Elect_consumptions)){
              console.log("เข้า999999");
              resultElect_consumptions = 10000000 - result[0].elect_meterdial_Current + parseInt(Elect_consumptions);
            }
            else{
              console.log("ปกติ2");
              resultElect_consumptions = Elect_consumptions - result[0].elect_meterdial_Current;
            }
          }
          if(check_update){
            mysql.query(
              "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,consumption_date=?,electricity_consumption=?,elect_meterdial_Current=? WHERE consumption_id = ?",
              [result[1].lease_id, result[1].user_id, result[1].property_id, result[1].room_id, result[1].consumption_date, resultElect_consumptions, Elect_consumptions, result[1].consumption_id],
            );
          }
          
          
        }else{    
          mysql.query(
            "UPDATE Utility_Consumption SET lease_id=?,user_id=?,property_id=?,room_id=?,consumption_date=?,electricity_consumption=?,elect_meterdial_Current=? WHERE consumption_id = ?",
            [result[0].lease_id, result[0].user_id, result[0].property_id, result[0].room_id, result[0].consumption_date, resultElect_consumptions, Elect_consumptions, result[0].consumption_id],
          );
        }
        results(null, result);
      }
    }
  );

};

module.exports = UtilityConsumption;