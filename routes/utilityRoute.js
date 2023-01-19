const express = require('express')
const router = express.Router()
const utilityConsumptionController = require('../controllers/utilityConsumptionController')

router.get('/', utilityConsumptionController.findAll)
router.get('/:lease_id', utilityConsumptionController.findByLeaseId)
router.post('/', utilityConsumptionController.create)
router.put('/:consumption_id', utilityConsumptionController.update)
router.delete('/:consumption_id', utilityConsumptionController.delete)

module.exports = router