const UtilityConsumption = require("../models/utilityModel")
const connection = require("../config/db")
const CronJob = require('cron').CronJob;

exports.findAll = function (req, res) {
  UtilityConsumption.findAll(function (err, utilityConsumption) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", utilityConsumption);
    res.send(utilityConsumption);
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
// job.start()