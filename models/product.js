const mongoose = require("mongoose");
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
Product = mongoose.model("Product", productSchema);
module.exports = Product;
