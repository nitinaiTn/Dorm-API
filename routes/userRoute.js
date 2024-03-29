const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);
router.post("/", UserController.create)
router.delete("/:id", UserController.delete);
router.put('/:id', UserController.update);
router.put('/email/:id', UserController.updateEmail);

module.exports = router;