const { productSchema } = require("./validationSchemas");
const { reviewSchema } = require("./validationSchemas");
const Product = require("./models/product");
module.exports.productValidateFunction = (req, res, next)=>{// middleware function to validate new Product form
    const{name, img, desc, price} = req.body;
    const{error} = productSchema.validate({name, img, desc, price});
    if(error){
        const msg = error.details.map(err=>err.message).join(',');// Joining all the error messages in an array
        res.render('products/error',{err:msg});
    }else{
        next();// if error is not found then run the next() function i.e insert data into database
    }
}
module.exports.reviewValidateFunction = (req, res, next)=>{// middleware function to validate new Product form
    const{comment, rating} = req.body;
    const{error} = reviewSchema.validate({comment, rating});
    console.log("ReviewValidate function called..");
    console.log(error);
    if(error){
        const msg = error.details.map(err=>err.message).join(',');// Joining all the error messages in an array
        req.flash('fail', msg);
        console.log("validator");
        res.render(`products/error`,{err:msg});
    }else{
        next();// if error is not found then run the next() function i.e insert data into database
    }
}
module.exports.isLoggedin = (req, res, next)=>{
// to check if it is an AJAX request we use req.xhr if it is true then it is AJAX req
    console.log("LoggedIn function called");    
if(req.xhr && !req.isAuthenticated()){// to check Ajax request of like button
        if(req.session.returnUrl){
            delete req.session.returnUrl;
        }
        req.flash('error', 'Please login first');
        return res.status(401).json({msg:"You need to lgin first"});
    }
    
    req.session.returnUrl = req.originalUrl;// capturing the prev url from that we come her
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login First");
        return res.redirect('/login');
    }
      next();
}
module.exports.isSeller = (req, res, next)=>{
    if(req.user && req.user.role == "seller"){
        return next();
    }
    req.flash("error","You need proper authorization");
    res.redirect("/products");
}
module.exports.isValidAuthor = async (req, res, next)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate("author");
    if(req.user && req.user._id.equals(product.author._id)){
        return next();
    }
    req.flash("error", "You need Proper Authorization");
    res.redirect("/products");
}