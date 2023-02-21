const express = require('express')
const router = express.Router()
const utilityConsumptionController = require('../controllers/utilityController')


router.get('/:lease_id', utilityConsumptionController.findByLeaseId)
router.get('/user/:userid', utilityConsumptionController.utilityConsumptionByUserId)
router.get('/', utilityConsumptionController.utilityConsumptionAdmin)

router.post('/', utilityConsumptionController.create)
router.put('/:consumption_id', utilityConsumptionController.update)
router.delete('/:consumption_id', utilityConsumptionController.delete)

module.exports = router