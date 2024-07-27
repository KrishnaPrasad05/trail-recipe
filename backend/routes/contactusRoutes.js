const express = require('express')
const { postContactUs, getContactUs, getOneContactUs } = require('../controllers/contactusController')
const router = express.Router()

router.post('/contactus',postContactUs)
router.get('/contactus',getContactUs)
router.get('/contactus/:id',getOneContactUs)

module.exports = router