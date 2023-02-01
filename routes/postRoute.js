const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.get('/', postController.findAll)
router.get('/:user_id', postController.findByUserId)
router.post('/', postController.testJoinPost)
router.put('/:post_id', postController.update)
router.delete('/:post_id', postController.delete)
// router.post('/testJoinPost', postController.testJoinPost)
router.get('/getJoin', postController.getJoin)


module.exports = router