/**
 * Created by john on 16/4/12.
 */
var validator = require('validator');
var TopicModel = require('../models/topic')
exports.showCreate = function(req,res){
    res.render('create');
};

exports.create = function(req,res){
    var title = validator.trim(req.body.title);
    var tab = validator.trim(req.body.tab);
    var content = validator.trim(req.body.t_content);

    var hasEmptyInfo = [title,tab,content].some(function(item){
       return item === '';
    });
    if(hasEmptyInfo){
        res.status(422);
        return res.render('create',{error:'您填写的内容不完整'});
    }
    var topicData = {
        title:title,
        tab:tab,
        content:content,
        username:req.session.user.username,
        insertTime:Date.now()
    }
    TopicModel.addTopic(topicData,function(err,result){
        if(result){
            res.redirect('/');
        }
    });
};