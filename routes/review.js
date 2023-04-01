const express = require("express");
const route = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");
const {reviewValidateFunction, isLoggedin} = require('../validationMiddleware');// server side validation using the middleware
route.post("/products/:id/review", isLoggedin, reviewValidateFunction, async (req,res)=>{
    try {
        const id = req.params.id;
        // console.log(req.body.comment);
        const review = await Review.create(req.body);
        const product = await Product.findById(id);
        product.reviews.push(review);// mongoose automatically save review id from review
        product.save();
        req.flash('success', 'Review added successfully!')// adding flash messages before redirecting
        res.redirect(`/products/${id}`);// before this line middleware of flash msg runs
    } catch (error) {
        console.log("route");
        res.render('products/error', {err:error.message});
    }
})
module.exports = route;