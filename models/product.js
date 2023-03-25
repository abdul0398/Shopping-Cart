const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        //trim:true, //  white spaces will be removed from both sides of the string.
        required:true
    },
    img:{
        type:String,
        //trim:true,
        default:"/images/product.jpg"
    },
    price:{
        type:Number,
        min:0,
        default:0
    },
    desc:String
})
Product = mongoose.model("Product",productSchema);
module.exports =  Product;