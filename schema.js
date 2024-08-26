const joi=require("joi");

module.exports.ListingSchema=joi.object({

    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.object({
             filename:joi.string().default("listingImage"),
            url:joi.string().allow("",null)
        }), 
      }).required()
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(0).max(5),
        comment:joi.string().required()
    }).required()
});