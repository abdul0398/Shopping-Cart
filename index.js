const express = require("express");
const app  = express();
const mongoose = require("mongoose");
const path = require("path");// to use (__dirname)
const ejsMate = require("ejs-mate");
//const seedDb = require("./seed");
const methodOverride = require("method-override");
const session = require('express-session')
const flash = require('connect-flash');// to show the flash messages based on express-session

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(()=>{
    console.log("Successfully Db started")
});

app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);// changing the default engine used by express to ejs mate for ejs templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));// this will override the request ex- post to patch in the html form

const sessionConfig = {
    secret: 'randomSecret',
    resave: false,
    saveUninitialized: true,
  }

app.use(session(sessionConfig));
app.use(flash());

// by using res.local we can set the variables that are available on all templates of view folder, so we dont need to repeat
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.fail = req.flash("Error");
    next();
});

//seedDb();
const ProductRoutes = require('./routes/product'); // importing default routes of products
app.use(ProductRoutes);
const reviewRoutes = require('./routes/review');
app.use(reviewRoutes);
app.listen(3000, ()=>{
    console.log("Server running at port 3000");
})