const express = require("express");
const route = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");
route.post("/products/:id/review", async (req,res)=>{
    const id = req.params.id; 
    const review = await Review.create(req.body);
    const product = await Product.findById(id);
    product.reviews.push(review);// mongoose automatically save review id from review
    product.save();
    res.redirect(`/products/${id}`);
})

module.exports = route;