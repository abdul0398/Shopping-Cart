const { productSchema } = require("./validationSchemas");
const { reviewSchema } = require("./validationSchemas");
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
        res.render('products/error',{err:msg});
    }else{
        next();// if error is not found then run the next() function i.e insert data into database
    }
}