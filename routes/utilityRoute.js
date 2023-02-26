const express = require('express')
const router = express.Router()
const utilityConsumptionController = require('../controllers/utilityController')


router.get('/:lease_id', utilityConsumptionController.findByLeaseId)
router.get('/user/:userid', utilityConsumptionController.utilityConsumptionByUserId)
router.get('/', utilityConsumptionController.utilityConsumptionAdmin)
router.post('/water/:room_id', utilityConsumptionController.updateWater_consumtion)
router.post('/elect/:room_id', utilityConsumptionController.updateElect_consumtion)
router.post('/', utilityConsumptionController.create)
router.put('/:consumption_id', utilityConsumptionController.update)
router.delete('/:consumption_id', utilityConsumptionController.delete)

module.exports = router