const express = require('express')
const router = express.Router()
const leaseController = require('../controllers/leaseController')

router.get('/', leaseController.findAll)
router.get('/:user_id', leaseController.findByUserId)
router.post('/', leaseController.create)
router.put('/:lease_id', leaseController.update)
router.delete('/:lease_id', leaseController.delete)

module.exports = router