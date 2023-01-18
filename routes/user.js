const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.index)
router.get('/', userController.create)
router.post('/', userController.store)

module.exports = router