const express = require('express')
const router = express.Router()
const {addComment, getComments}= require('../controllers/commentController')

router.post('/recipe/:recipeId/comment',addComment)
router.get('/recipe/:recipeId/comment',getComments)

module.exports = router;