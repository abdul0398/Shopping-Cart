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
    const{name, comment, rating} = req.body;
    const{error} = reviewSchema.validate({name, comment, rating});
    if(error){
        const msg = error.details.map(err=>err.message).join(',');// Joining all the error messages in an array
        req.flash('fail', msg);
        res.render(`products/error`,{err:msg});
    }else{
        next();// if error is not found then run the next() function i.e insert data into database
    }
}
module.exports.isLoggedin = (req, res, next)=>{
    req.session.returnUrl = req.originalUrl;
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