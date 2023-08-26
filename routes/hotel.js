const express = require('express')
const router = express.Router()
const hotelController = require('../controllers/hotelController')
const multer = require('multer')

// Multer configuration for uploading images to the server
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/hotels')
    },
    filename: function(req, file, cb) {
       
        console.log('File',file)
        cb(null,Date.now() +  file.originalname.replace(/\s+/g, '_'))
    }
})
var upload = multer({storage})

router.get('/', hotelController.getAll)
router.post('/new',upload.array('images',5), hotelController.add)
router.get('/:id', hotelController.getById)
router.get('/room/:id', hotelController.getHotelByRoom)
router.get('/tags/:tag', hotelController.getHotelsByTag)
router.put('/:id', upload.array('images',5), hotelController.update)
router.delete('/:id', hotelController.remove)
module.exports=router;