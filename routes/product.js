const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {home, ShowAllProducts, showSingleProduct, deleteProduct, productEditForm, productEditFormSubmit, newPrductsForm, newPrductsSubmit} = require("../controllers/product");
const { productValidateFunction, isLoggedin, isValidAuthor, isSeller } = require("../validationMiddleware");
router.get("/", home);

router.get("/products", ShowAllProducts);

router.get("/products/new", isLoggedin,isSeller,newPrductsForm);

router.post("/products/new", productValidateFunction,isLoggedin,isSeller,newPrductsSubmit);

router.get("/products/:id",showSingleProduct);

router.get("/products/:id/edit", isLoggedin,productEditForm);

router.patch("/products/:id/edit", productValidateFunction, isLoggedin, isSeller, isValidAuthor, productEditFormSubmit);

router.delete("/delete/:id",isLoggedin,isSeller, isValidAuthor,deleteProduct);

module.exports = router;