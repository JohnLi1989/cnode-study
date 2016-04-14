/**
 * Created by john on 16/4/12.
 */
var validator = require('validator');
var TopicModel = require('../models/topic');
var ReplyModel = require('../models/reply');
var eventproxy = require('eventproxy');



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

}

exports.detail = function(req,res){
    var tid = req.params._id;
    var ep = new eventproxy();
    ep.all('detail_success','count_success','replys_success',function(topic,count,replys){
        res.render('detail',{topic:topic,count:count,replys:replys});
    });
    TopicModel.getTopic(tid,function(err,topic){
       ep.emit('detail_success',topic);
    });
    ReplyModel.count(tid,function(err,count){
        ep.emit('count_success',count);
    });
    ReplyModel.getReplys(tid,function(err,replys){
        console.log(replys)
       ep.emit('replys_success',replys);
    });
}

exports.reply = function(req,res){
    var tid = req.body.tid;
    var content = req.body.r_content;
    var username  = req.session.user.username;
    var replyData = {
        tid : tid,
        content:content,
        username:username,
        insertTime:Date.now()
    }
    ReplyModel.addReply(replyData,function(err,result){
        res.redirect('/topic/'+tid);
    });
}

exports.upload = function(req,res){

}