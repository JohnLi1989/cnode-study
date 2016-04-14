/**
 * Created by john on 16/4/15.
 */
var mongoose = require('mongoose');
var ReplySchema = new mongoose.Schema({
   tid:String,
    content:String,
    username:String,
    insertTime:Date
});

ReplySchema.statics = {
    /*count : function(tid,cb){
        this.count({tid:tid},cb);
    },*/
    getReplys:function(tid,cb){
        this.find({tid:tid},cb);
    },
    addReply:function(replyData,cb){
        this.create(replyData,cb);
    }
}

var ReplyModel = mongoose.model('Reply',ReplySchema);

module.exports=ReplyModel;