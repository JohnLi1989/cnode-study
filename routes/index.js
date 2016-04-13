var express = require('express');
var router = express.Router();
var signController = require('../controllers/sign');
var indexController = require('../controllers/index');
/* GET home page. */
router.get('/',indexController.index);

router.get('/signup',signController.showSignup);

router.post('/signup',signController.signup);

router.get('/signin',signController.showSignin);

router.post('/signin',signController.signin);

router.get('/signout',signController.signout);

module.exports = router;
