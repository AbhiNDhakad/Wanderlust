const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
module.exports.isLoggedIn=(req,res,next)=>
{
    if(!req.isAuthenticated())
        {
            req.session.redirectUrl=req.originalUrl;
            req.flash("error","you are not logged in ! please login");
            return res.redirect("/login");
        }
        next();
};
module.exports.saveRedirectUrl=(req,res,next)=>
    {
            if(req.session.redirectUrl) 
                    res.locals.redirectUrl=req.session.redirectUrl;
            next();
    }

module.exports.isOwner=async(req,res,next)=>
    {
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id))
        {
            req.flash("error","you don't have permission to  modify Listing");
           return res.redirect(`/listings/${id}`);
        }
        next();
    }

module.exports.isReviewOwner=async(req,res,next)=>
    {
            let {id,reviewId}=req.params;
            let review=await Review.findById(reviewId);
            if(!review.author.equals(res.locals.currUser._id))
            {
                req.flash("error","you are not author of the Review");
               return res.redirect(`/listings/${id}`);
            }
        next();
     }
    
        