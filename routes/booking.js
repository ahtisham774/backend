const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')


router.post('/create', bookingController.createPayment)
router.post('/save', bookingController.add)
router.get('/', bookingController.getAll)
router.get('/pk_key', bookingController.getPK_Key)

module.exports=router;