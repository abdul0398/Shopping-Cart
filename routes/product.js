const express = require("express");
const { productValidateFunction, isLoggedin, isValidAuthor, isSeller } = require("../validationMiddleware");
const router = express.Router();
const Product = require("../models/product");
router.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.render("products/index", { products });
    } catch (error) {
      res.render("products/error", { err: error.message });
    }
});
router.get("/products/new", isLoggedin,isSeller, (req, res) => {
    try {
      res.render("products/newProduct");
    } catch (error) {
      res.render("products/error", { err: error.message });
    }
});
// validateproduct is middleware runs before this function do the validation;
router.post("/products/new", productValidateFunction,isLoggedin,isSeller, async (req, res) => {
    const author = req.user;   
  try {
        const { name, img, desc, price, } = req.body;
        await Product.create({ name, img, desc, price, author});
        req.flash("success", "Product added Successfully");
        res.redirect("/products");
      } catch (error) {
        res.render("products/error", { err: error.message });
    }
});
router.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate(['reviews', 'author']);; // populate method replace the review id's in product schema to actual reviews
    let isAuthor = false
     if(product.author && req.user && product.author.username == req.user.username){// current user and product author should be same
       isAuthor = true;
     }
    res.render("products/showProduct", {product: product,reviews: product.reviews, isAuthor:isAuthor});
  } catch (error) {
    res.render("products/error", { err: error.message });
  }
});
router.get("/products/:id/edit", isLoggedin, async (req, res) => {
  
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
  } catch (error) {
    res.render("products/error", { err: error.message });
  }
});
// update the edited product
router.patch(
  "/products/:id/edit",
  productValidateFunction,
  isLoggedin,
  isSeller,
  isValidAuthor,
  async (req, res) => {
    try {
      const id = req.params.id;
      const update = {
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        desc: req.body.desc,
      };
      const product = await Product.findOneAndUpdate({ _id: id }, update, {
        new: true,
      }).populate("reviews");
      req.flash("sucess", "Edit successfully!");
      res.redirect(`/products/${req.params.id}`);
    } catch (error) {
      res.render("products/error", { err: error.message });
    }
  }
);
// deleting the product
router.delete("/delete/:id",isLoggedin,isSeller, isValidAuthor, async (req, res) => {
  try {
    const id = req.params.id;
    //const product = await Product.findById(id);
    // for(let id of product.reviews){ // deleting all the reviews associated to products (not an efficient way )
    //     await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);
    req.flash("Error", "Product deleted Successfully");
    res.redirect("/products");
  } catch (error) {
    res.render("products/error", { err: error.message });
  }
});

module.exports = router;