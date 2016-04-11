/**
 * Created by john on 16/4/12.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username:String ,
    pass:String,
    email:String
});

UserSchema.statics = {
    getUserBySignupInfo : function(username,email,cb){
        this.find({'$or':[{username:username},{email:email}]},cb);
    },
    addUser : function(user,cb){
        this.create(user,cb);
    },
    getUser : function(username,pass,cb){
        this.findOne({username:username,pass:pass},cb);
    }
}

var UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;


