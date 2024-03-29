const express = require("express")
const router = express.Router()
const maintenanceController = require("../controllers/maintenanceController")

// Get all maintenance requests
router.get("/", maintenanceController.findAll);

// Get a single maintenance request by ID
router.get("/:id", maintenanceController.findById);

router.get("/user/:id", maintenanceController.findbyUserId);
// Create a new maintenance request
router.post("/", maintenanceController.create);

// Delete a maintenance request by ID
router.delete("/:id", maintenanceController.delete);

// Update a maintenance request by ID
router.put("/:id", maintenanceController.update);

router.put("/updateStatus/:id", maintenanceController.updateStatus);

module.exports = router