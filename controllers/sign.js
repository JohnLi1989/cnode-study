/**
 * Created by john on 16/4/11.
 */
var eventproxy = require('eventproxy');
var UserModel = require('../models/user');
exports.showSignup = function(req,res){
    res.render('signup');
}
exports.signup = function(req,res){
    //get userinfo
    var username = req.body.loginname;
    var pass = req.body.pass;
    var re_pass = req.body.re_pass;
    var email = req.body.email;
    var ep = new eventproxy();
    ep.on('error_info',function(msg){
        res.status(422);
        res.render('signup',{error:msg});
    });
    //check info
    var hasEmptyInfo = [username,pass,re_pass,email].some(function(item){
        return item === '';
    });
    var isPassDiff = pass !== re_pass;
    if(hasEmptyInfo || isPassDiff){
        ep.emit('error_info','注册信息错误');
        return;
    }
    //save to db
    UserModel.getUserBySignupInfo(username,email,function(err,users){
       if(err){
           ep.emit('error_info','获取用户数据失败');
           return;
       }
        if(users.length>0){
            ep.emit('error_info','该用户名或邮箱已存在');
            return;
        }
        UserModel.addUser({username:username,pass:pass,email:email},function(err,result){
            if(result){
                res.redirect('/signin');
            }else{
                ep.emit('error_info','注册失败');
            }
        })

    });
}
exports.showSignin = function(req,res){
    res.render('signin');
}
exports.signin = function(req,res){
    var username = req.body.name;
    var pass = req.body.pass;
    //var ep = new eventproxy();
    if(!username || !pass){
        res.status(422);
        //ep.emit('error_info','用户名密码不能为空');
        return res.render('signin',{error:'用户名和密码不能为空'});
    }
    UserModel.getUser(username,pass,function(err,user){
       if(user){
           req.session.user = user;
           res.redirect('/');
       }else{
           res.status(422);
           res.render('signin',{error:'用户名或密码错误'});
       }
    });
}
exports.signout = function(req,res){
    req.session.destroy();
    res.redirect('/');
}