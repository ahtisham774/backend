const RoomController =  require('../controllers/roomController')
const express = require('express')
const router = express.Router()
const multer = require('multer')

// Multer configuration for uploading images to the server
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/rooms')
    },
    filename: function(req, file, cb) {
        cb(null,Date.now() +  file.originalname.replace(/\s+/g, '_'))
    }
})
var upload = multer({storage})

router.get('/', RoomController.getAll)
router.get('/:id', RoomController.getById)
router.post('/new',upload.single('image'), RoomController.add)
router.put('/:id',upload.single('image'), RoomController.update)
router.delete('/:id', RoomController.remove)
module.exports=router