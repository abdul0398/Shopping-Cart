const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {isLoggedin} = require('../validationMiddleware');
const User = require('../models/user');
router.get('/user/cart',isLoggedin, async (req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId).populate('cart');// finding user
    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    const productInfo = user.cart.map((p) => p.desc).join(',');
    res.render('cart', { user ,totalAmount,productInfo});
})
router.post('/user/:id/add',isLoggedin, async (req,res)=>{
    const userId = req.user._id;
    const productId = req.params.id;
    const product = await Product.findById(productId);// finding product
    const user = await User.findById(userId);// finding user
    user.cart.push(product);// putting product id into user's cart
    await user.save();
    res.redirect('/user/cart');
})

module.exports = router;