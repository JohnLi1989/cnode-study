var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var topic = require('../controllers/topic');

router.get('/create',auth.requireLogin,topic.showCreate);
router.post('/create',auth.requireLogin,topic.create);
router.get('/:_id',topic.detail);

router.post('/reply',auth.requireLogin,topic.reply);
router.post('/upload',auth.requireLogin,topic.upload);
module.exports = router;