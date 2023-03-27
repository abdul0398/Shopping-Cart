const express = require("express");
const route = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");
const {reviewValidateFunction} = require('../validationMiddleware');// server side validation using the middleware
route.post("/products/:id/review",reviewValidateFunction, async (req,res)=>{
    try {
        const id = req.params.id;
        // console.log(req.body.comment);
        const review = await Review.create(req.body);
        const product = await Product.findById(id);
        product.reviews.push(review);// mongoose automatically save review id from review
        product.save();
        res.redirect(`/products/${id}`);
    } catch (error) {
        res.render('products/error', {err:error.message});
    } 
})
module.exports = route;