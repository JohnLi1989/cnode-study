/**
 * Created by john on 16/4/13.
 */
var TopicModel = require('../models/topic');
var UserModel = require('../models/user');
var eventproxy = require('eventproxy');
exports.index = function(req,res){
    var page = parseInt(req.query.page) || 1;
    page = page > 0 ? page : 1 ;
    var tab = req.query.tab || "all";
    var query = {};
    if(tab != "all"){
        query.tab = tab ;
    }
    var count = 40;
    var option = {skip:(page-1)*count,limit:count,sort:'-insertTime'};

    var ep = new eventproxy();
    ep.all('index_success','page_success','user_success',function(topics,pageCount,userInfo){
        res.render('index',{topics:topics,page:page,pageCount:pageCount,userInfo:userInfo});
    });

    TopicModel.getTopics(query,option,function(err,topics){
        console.log(topics)
       ep.emit('index_success',topics);
    });
    TopicModel.pageCount(query,function(err,allCount){
       var pageCount = Math.ceil(allCount/count);
        ep.emit('page_success',pageCount);
    });
    var username = req.session.user.username;
    UserModel.getUserInfo(username,function(err,userInfo){
       ep.emit('user_success',userInfo);
    });
}