const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.get('/', postController.findAll)
router.get('/:user_id', postController.findByUserId)
router.post('/', postController.create)
router.put('/:post_id', postController.update)
router.delete('/:post_id', postController.delete)
router.post('/testJoinPost', postController.testJoinPost)

module.exports = router