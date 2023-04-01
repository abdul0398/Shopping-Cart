const Joi = require('joi');
module.exports.productSchema = Joi.object({
    name:Joi.string().required(),
    img:Joi.string().required(),
    desc:Joi.string().required(),
    price: Joi.number().min(0).required()
})
module.exports.reviewSchema = Joi.object({
    rating:Joi.number().min(0).max(5),
    comment:Joi.string().required()
})