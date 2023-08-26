var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './public/images/users');
    },
    filename: function filename(req, file, cb) {
        cb(null, Date.now() + file.originalname.replace(/\s+/g, '_'));
    }
});
var upload = multer({ storage: storage });

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/register', upload.single('profileImage'), UserController.add);
router.put('/:id', upload.single('profileImage'), UserController.update);
router.delete('/:id', UserController.remove);
router.post('/login', UserController.login);
router.post('/admin/login', UserController.adminLogin);
router.get('/current/:email', UserController.getCurrentUser);

module.exports = router;
