const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/propertyController')

router.get('/', propertyController.findAll)
router.get('/:owner_id', propertyController.findByOwnerId)
router.post('/', propertyController.create)
router.put('/:property_id', propertyController.update)
router.delete('/:property_id', propertyController.delete)

module.exports = router