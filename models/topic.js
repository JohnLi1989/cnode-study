/**
 * Created by john on 16/4/13.
 */
var mongoose = require('mongoose');
var TopicSchema = new mongoose.Schema({
   title:String,
    tab:String,
    content:String,
    username:String,
    insertTime:Date
});

TopicSchema.statics = {
    addTopic :function(topicData,cb){
        this.create(topicData,cb);
    },
    getTopics : function(query,option,cb){
        this.find([query,option],cb);
    },
    pageCount : function(query,cb){
        this.count(query,cb);
    }
}



var TopicModel = mongoose.model('Topic',TopicSchema);
module.exports = TopicModel;