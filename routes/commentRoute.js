const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.get('/', commentController.findAll)
router.get('/:post_id', commentController.findByPostId)
router.post('/', commentController.create)
router.put('/:comment_id', commentController.update)
router.delete('/:comment_id', commentController.delete)

module.exports = router