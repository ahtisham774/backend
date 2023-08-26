var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');


router.post('/login', UserController.adminLogin);
router.get('/:email', UserController.getAdmin);

module.exports = router;
