const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
        
    }],
    wishList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})
// passport-local-mongoose will add automatically three fields in the schema i.e username, salt, and hash of password;
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);
module.exports = User;