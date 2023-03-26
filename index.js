const express = require("express");
const mongoose = require("mongoose");
const path = require("path");// to use (__dirname)
const ejsMate = require("ejs-mate");
const seedDb = require("./seed");
const app  = express();
const methodOverride = require("method-override");
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(()=>{
    console.log("Successfully Db started")
});

app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);// changing the default engine used by express to ejs mate for ejs templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));// this will override the request ex- post to patch in the html form
//seedDb();
const ProductRoutes = require('./routes/product'); // importing default routes of products
app.use(ProductRoutes);
const reviewRoutes = require('./routes/review');
app.use(reviewRoutes);
app.listen(3000, ()=>{
    console.log("Server running at port 3000");
})