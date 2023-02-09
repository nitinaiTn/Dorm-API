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

// exports.create = function (req, res) {
//   const new_request = new MaintenanceRequest(req.body);
//   //handles null error
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     MaintenanceRequest.create(new_request, function (err, request) {
//       if (err) res.send(err);
//       res.json({
//         data: request,
//       });
//     });
//   }
// };

// exports.delete = function (req, res) {
//   MaintenanceRequest.delete(req.params.id, function (err, request) {
//     if (err) res.send(err);
//     res.json({ message: "Maintenance Request successfully deleted" });
//   });
// };

// exports.update = function (req, res) {
//   MaintenanceRequest.update(req.params.id, new MaintenanceRequest(req.body), function (err, request) {
//     if (err) res.send(err);
//     res.json({ message: "Maintenance Request successfully updated" });
//   });
// };