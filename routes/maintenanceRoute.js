const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/MaintenanceController");

// Get all maintenance requests
router.get("/", maintenanceController.findAll);

// // Get a single maintenance request by ID
// router.get("/:id", maintenanceController.findById);

// // Create a new maintenance request
// router.post("/", maintenanceController.create);

// // Delete a maintenance request by ID
// router.delete("/:id", maintenanceController.delete);

// // Update a maintenance request by ID
// router.put("/:id", maintenanceController.update);

module.exports = router