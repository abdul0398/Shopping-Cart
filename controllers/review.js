const Product = require('../models/product');
const Review = require('../models/review');
const review = async (req,res)=>{
    try {
        const id = req.params.id;
        console.log(req.body);
        const name = req.user.name;
        const{rating, comment} = req.body;
        const review = await Review.create({name:name, rating:rating, comment:comment});
        const product = await Product.findById(id);
        product.reviews.push(review);// mongoose automatically save review id from review
        product.save();
        req.flash('success', 'Review added successfully!')// adding flash messages before redirecting
        res.redirect(`/products/${id}`);// before this line middleware of flash msg runs
    } catch (error) {
        console.log("route");
        res.render('error', {err:error.message});
    }
}
module.exports = review;