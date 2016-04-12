/**
 * Created by john on 16/4/12.
 */
var validator = require('validator');

exports.showCreate = function(req,res){
    res.render('create');
};

exports.create = function(req,res){
    var title = validator.trim(req.body.title);
    var tab = validator.trim(req.body.tab);
    var content = validator.trim(req.body.t_content);
};