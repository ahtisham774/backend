var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/employeeController');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './public/images/employees');
    },
    filename: function filename(req, file, cb) {
        cb(null, Date.now() + file.originalname.replace(/\s+/g, '_'));
    }
});
var upload = multer({ storage: storage });

router.get('/', EmployeeController.getAll);
router.post('/register', upload.single('profileImage'), EmployeeController.add);
router.delete('/:id', EmployeeController.remove);

module.exports = router;
