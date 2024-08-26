const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const { isLoggedIn, isReviewOwner } = require("../middleware.js");
const reviewController=require("../controller/review.js");
const validateReview=(req,res,next)=>
    {
    let {error}=reviewSchema.validate(req.body);
    if(error)
    {
        throw new ExpressError(400,error);
    }           
    else
        next();
}
//Reviews
//create review
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewOwner,reviewController.destroyReview);
    
    module.exports=router;