const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async(req,res)=>
    {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author=req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success","new review created");
        console.log("review saved");
        res.redirect(`/listings/${listing._id}`);
    }

module.exports.destroyReview=async(req,res)=>
    {
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        req.flash("success","Listing Updated");
        await Review.findByIdAndDelete(reviewId);
        console.log("deleted");
        res.redirect(`/listings/${id}`);
    }