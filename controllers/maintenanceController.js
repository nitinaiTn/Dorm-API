const MaintenanceRequest = require("../models/maintenanceModel")


exports.findAll = function (req, res) {
  MaintenanceRequest.findAll(function (err, requests) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", requests);
    res.send(requests);
  });
};

exports.findById = function (req, res) {
  MaintenanceRequest.findById(req.params.id, function (err, request) {
    if (err) res.send(err);
    res.json(request);
  });
};
exports.findbyUserId = function (req, res) {
  MaintenanceRequest.findbyUserId(req.params.id, function (err, request) {
    if (err) res.send(err);
    res.json(request);
  });
};

exports.create = function (req, res) {
  let user_id = req.body.user_id
  let property_id= req.body.property_id
  let room_id = req.body.room_id 
  let request_text= req.body.request_text
  let request_title = req.body.request_title
  let request_status = "no open"

  
  var futureDate = new Date()
  futureDate.setTime(futureDate.getTime() + 3600*1000*7);
  var Stringsdate = futureDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')
  let date_created = Stringsdate
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    MaintenanceRequest.create(user_id, property_id, room_id, request_text,request_title,date_created,request_status , function (err, request) {
      if (err) res.send(err);
      res.json({
        data: request,
      });
    });
  }
};

exports.delete = function (req, res) {
  MaintenanceRequest.delete(req.params.id, function (err, request) {
    if (err) res.send(err);
    res.json({ message: "Maintenance Request successfully deleted" });
  });
};

exports.update = function (req, res) {
  MaintenanceRequest.update(req.params.id, new MaintenanceRequest(req.body), function (err, request) {
    if (err) res.send(err);
    res.json({ message: "Maintenance Request successfully updated" });
  });
};