// as we are creating 1 to many relationship so we are creating new model for review;
const mongoose = require("mongoose");
const reviewScehma = mongoose.Schema({
    name:String,
    rating:{
        type:Number,
        max:5,
        min:0
    },
    comment:String
},{timestamps:true});// timestamps create two new fields created at and updated at time in schema; 
const Review = new mongoose.model("Review", reviewScehma);
module.exports = Review;