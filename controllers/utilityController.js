const UtilityConsumption = require("../models/utilityModel")
const connection = require("../config/db");
const cloudinary = require("../config/cloudianary");
const { resource } = require("../Server");
const CronJob = require('cron').CronJob;
const fileUpload = require("express-fileupload");
// Configuration 


exports.findAll = function (req, res) {
  UtilityConsumption.findAll(function (err, utilityConsumption) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", utilityConsumption);
    res.send(utilityConsumption);
  });
};

exports.utilityConsumptionByUserId = function (req, res) {
  console.log(req.params.userid);
  UtilityConsumption.utilityConsumptionByUserId(req.params.userid, function (err, utilityConsumption) {
    if (err) res.send(err);
    res.json(utilityConsumption);
  });
};

exports.utilityConsumptionAdmin = function (req, res) {
  UtilityConsumption.utilityConsumptionAdmin(function (err, utilityConsumption) {
    if (err) res.send(err);
    console.log("res", utilityConsumption);
    res.json(utilityConsumption);
  });
};

exports.utilityConsumptionByPropertyid  = function (req, res) {
  UtilityConsumption.utilityConsumptionByPropertyid (req.params.propertyid,function (err, utilityConsumption) {
    if (err) res.send(err);
    console.log("res", utilityConsumption);
    res.json(utilityConsumption);
  });
};

exports.findByLeaseId = function (req, res) {
  UtilityConsumption.findByLeaseId(req.params.lease_id, function (err, utilityConsumption) {
    if (err) res.send(err);
    res.json(utilityConsumption);
  });
};

exports.create = function (req, res) {
  const new_utilityConsumption = new UtilityConsumption(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    UtilityConsumption.create(new_utilityConsumption, function (err, utilityConsumption) {
      if (err) res.send(err);
      res.json({
        data: utilityConsumption,
      });
    });
  }
};

exports.delete = function (req, res) {
  UtilityConsumption.delete(req.params.consumption_id, function (err, utilityConsumption) {
    if (err) res.send(err);
    res.json({ message: "Utility consumption successfully deleted" });
  });
};



exports.update = function (req, res) {
  UtilityConsumption.update(req.params.consumption_id, new UtilityConsumption(req.body), function (err, utilityConsumption) {
    if (err) res.send(err);
    res.json({ message: "Utility consumption successfully updated" });
  });
};

exports.updateWater_consumtion = async function (req, res) {
  const file = req.files.image;
  const  resultss  = await cloudinary.uploader.upload(file.tempFilePath,{
    public_id: Date.now(),
    resource_type:"auto",
    folder: "Dorm"
  })
  UtilityConsumption.updateWater_consumtion(req.params.room_id, req.body.water_meterdial_Current,resultss.url, function (err,results) {
    if (err) res.send(err);
    res.json({
      url : resultss.url,
      message: "Utility consumption successfully updated"
    });
  });
};


exports.updateElect_consumtion = async function (req, res) {
  const file = req.files.image;
  const resultzz  = await cloudinary.uploader.upload(file.tempFilePath,{
    public_id: Date.now(),
    resource_type:"auto",
    folder: "Dorm"
  })
  UtilityConsumption.updateElect_consumtion(req.params.room_id, req.body.elect_meterdial_Current,resultzz.url, function (err, results) {
    if (err) res.send(err);
    res.json({ 
      url : resultzz.url,
      message: "Utility consumption successfully updated" });
  });
};

const job = new CronJob(
  '0 0 0 15 * *',
  function () {
    connection.query('UPDATE Utility_Consumption SET water_consumption?,electricity_consumption=? WHERE consumption_id = ?', function (error, results, fields) {
      if (error) throw error;
      console.log('The field has been updated successfully');
    });
  },
  null,
  true,
  'Asia/BangKok'
);

const jobs = new CronJob(
  '0 0 0 15 * *',
  function () {
    connection.query('select p.number_of_floors ,p.number_of_rooms ,p.property_id  FROM Properties p ', function (error, result, fields) {
      if (error) throw error;
      else{
        let index = result.length-1;
        for(let x = 0; x < index; x++){
        const numberOfFloors = result[x].number_of_floors;
        const roomsPerFloor = result[x].number_of_rooms;
        
        // Collect all data to be inserted in an array
        const data = [];
        for (let i = 1; i <= numberOfFloors; i++) {
          for (let j = 1; j <= roomsPerFloor; j++) {
            const floorNumber = i;
            const roomNumber = j;
            data.push([floorNumber, roomNumber, 'free', result[x].property_id]);
          }
        }

        }
        
      }
      

    });
  },
  null,
  true,
  'Asia/BangKok'
);

// job.start()