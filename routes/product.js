const express = require("express");
const router = express.Router();
const Product = require("../models/product");
router.get('/products', async (req,res)=>{
    const products = await Product.find();
    res.render("products/index",{products});
})
router.get('/products/new',(req,res)=>{
    res.render('products/newProduct');
})
router.post('/products/new', async (req,res)=>{
    const {name,img,desc,price} = req.body;
    await Product.create({name,img,desc,price});
    res.redirect('/products');
})
router.get('/products/:id',async (req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render("products/showProduct", {product});
})
router.get('/products/:id/edit', async (req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/edit',{product});
})
router.post('/products/:id/edit', async (req,res)=>{
    const id = req.params.id;
    const update = {
        name:req.body.name,
        img:req.body.img,
        price:req.body.price,
        desc:req.body.desc,
    }
    const product = await Product.findOneAndUpdate({_id:id},update,{new:true});
    res.render("products/showproduct",{product});
})
// router.get('/delete/:id', async (req,res)=>{
//     const id = req.params.id;
//     console.log(id);
//     // await Product.findByIdAndDelete(id);
//     // res.redirect('/products');
// })

module.exports = router;