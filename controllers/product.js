const Product = require('../models/product');
const Review = require('../models/review');
const User = require("../models/user");

module.exports.home = async (req, res) => {
    try {
      res.render("home");
    } catch (error) {
      res.render("error", { err: error.message });
    }
};

module.exports.ShowAllProducts =  async (req, res) => {
    try {
      const products = await Product.find();
      res.render("index", { products });
    } catch (error) {
      res.render("error", { err: error.message });
    }
};

module.exports.newPrductsForm = async (req, res) => {
    try {
      res.render("newProduct");
    } catch (error) {
      res.render("error", { err: error.message });
    }
};

module.exports.newPrductsSubmit = async (req, res) => {
    const author = req.user;   
  try {
        const { name, img, desc, price, } = req.body;
        await Product.create({ name, img, desc, price, author});
        req.flash("success", "Product added Successfully");
        res.redirect("/products");
      } catch (error) {
        res.render("error", { err: error.message });
    }
};

module.exports.showSingleProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id).populate(['reviews', 'author']);; // populate method replace the review id's in product schema to actual reviews
      let isAuthor = false
       if(product.author && req.user && product.author.username == req.user.username){// current user and product author should be same
         isAuthor = true;
       }
      res.render("showProduct", {product: product,reviews: product.reviews, isAuthor:isAuthor});
    } catch (error) {
      res.render("error", { err: error.message });
    }
};
module.exports.productEditForm =  async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      res.render("edit", { product });
    } catch (error) {
      res.render("error", { err: error.message });
    }
};

module.exports.productEditFormSubmit =  async (req, res) => {
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
      res.render("error", { err: error.message });
    }
};
module.exports.deleteProduct =  async (req, res) => {
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
      res.render("error", { err: error.message });
    }
};