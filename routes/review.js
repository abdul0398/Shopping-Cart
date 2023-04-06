const express = require("express");
const route = express.Router();
const Review = require("../models/review");
const Product = require("../models/product");
const review= require('../controllers/review');
const {reviewValidateFunction, isLoggedin} = require('../validationMiddleware');// server side validation using the middleware
route.post("/products/:id/review", isLoggedin, reviewValidateFunction, review)
module.exports = route;