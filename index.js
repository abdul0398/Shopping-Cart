require('dotenv').config();
const express = require("express");
const app  = express();
const mongoose = require("mongoose");
const path = require("path");// to use (__dirname)
const ejsMate = require("ejs-mate");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
//const seedDb = require("./seed");
const methodOverride = require("method-override");
const session = require('express-session')
const MongoStore = require('connect-mongo');// used to store session on mongoDb instead of program storage because it is limited
const flash = require('connect-flash');// to show the flash messages based on express-session


const dbUrl = process.env.URL;
console.log(dbUrl);
mongoose.connect("mongodb+srv://abdul77789:Neet2019@cluster0.t6ll3yo.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Successfully Db started")
}).catch(error=>{
    console.log("Error");
});


app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);// changing the default engine used by express to ejs mate for ejs templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));// this will override the request ex- post to patch in the html form
const sessionConfig = {
    secret: process.env.secret || "RANDOMSECRET",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,// so that no one can use script and use session id(by default it is already true)
        maxAge:(7 * 24 * 60 * 60 * 1000)// expires in 1 week
    },
    store: MongoStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600// at least session will remain for 24hr

    })
}

app.use(session(sessionConfig));
app.use(flash());


// initializing middleware for passport
app.use(passport.session());
app.use(passport.authenticate('session'));



// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

// basically check the username and password and match with data base;
passport.use(new LocalStrategy(User.authenticate())); //this will do the work for the above code and it is provided by passport-local-mongoose
passport.serializeUser(User.serializeUser());// Add the user.id into session corresponds to user;
passport.deserializeUser(User.deserializeUser())// remove the user.id from the session;


// by using res.local we can set the variables that are available on all templates of view folder, so we dont need to repeat
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;// making the user available to all the templates 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//seedDb();

// ALL THE ROUTES
const ProductRoutes = require('./routes/product'); // importing default routes of products
app.use(ProductRoutes);
const reviewRoutes = require('./routes/review');
app.use(reviewRoutes);
const userRoutes = require('./routes/auth');
app.use(userRoutes);
const productapi = require('./routes/productapi');
app.use(productapi);
const cartRoute = require('./routes/cartRoute');
app.use(cartRoute);
const paymentroute = require('./routes/razorpay');
app.use(paymentroute);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server running at port 3000");
})