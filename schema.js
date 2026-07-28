const Joi = require('joi');
const validCategories = require("./utills/categories");

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().min(2).required(),
        country:Joi.string().required(),
        price:Joi.number().min(1).required(),
        image: Joi.object({
            url: Joi.string().allow("", null)
        }),
        category: Joi.array().items(Joi.string().valid(...validCategories)).min(1).required()
    }).required(),
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});