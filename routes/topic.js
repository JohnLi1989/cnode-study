var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var topic = require('../controllers/topic');

router.get('/create',auth.requireLogin,topic.showCreate);
router.post('/create',auth.requireLogin,topic.create);

module.exports = router;