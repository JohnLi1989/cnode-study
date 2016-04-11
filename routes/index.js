var express = require('express');
var router = express.Router();
var signController = require('../controllers/sign')
/* GET home page. */
router.get('/signup',signController.showSignup);

router.post('/signup',signController.signup);

router.get('/signin',signController.showSignin);

router.post('/signin',signController.signin);

router.post('/signout',signController.signout);

module.exports = router;
