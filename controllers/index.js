/**
 * Created by john on 16/4/13.
 */
var TopicModel = require('../models/topic');
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
    TopicModel.getTopics(query,option,function(err,topics){
       if(err){
           
       }
    });
}