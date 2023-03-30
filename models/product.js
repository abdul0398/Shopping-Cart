const mongoose = require("mongoose");
const Review = require("./review");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //trim:true, //  white spaces will be removed from both sides of the string.
    required: true,
  },
  img: {
    type: String,
    //trim:true,
    default: "/images/product.jpg",
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  desc: String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  reviews: [
    {
      // can't directly set ObjectId as it is not a generic type in js
      type: mongoose.Schema.Types.ObjectId, // storing the ids of reviews that are associated with this product
      ref: "Review",
    },
  ],
  
  // reviews:[{ // we do like this in case of one to few relationship
  //     name:String,
  //     rating:Number,
  //     review:String
  // }]
});


// middleware function runs before findByIdAndDelete & next will points to next function that needs to be run
// productSchema.pre('findOneAndDelete', function(next){
//   console.log("pre middle ware starts")
//   next();
// })

// middlewares are written before model compiling
// post middleware function runs after findByIdAndDelete
productSchema.post('findOneAndDelete', function(product){
  console.log("pre middle ware starts")// product is the deleted product item
  if(product.reviews.length > 0){ 
    Review.deleteMany({_id:{$in:product.reviews}});// $in takes array as a field, in will choose id one by one from array and match with _id and delete
  }
})


Product = mongoose.model("Product", productSchema);
module.exports = Product;
