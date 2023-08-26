const express = require('express')
const router = express.Router()
const amenitiesController = require('../controllers/amenitiesController')

router.get('/', amenitiesController.getAll)
router.post('/new', amenitiesController.add)
router.delete('/:id', amenitiesController.remove)

module.exports=router;  