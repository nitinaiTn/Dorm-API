const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);

module.exports = router;