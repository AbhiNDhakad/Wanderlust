const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const {ListingSchema}=require("../schema.js");
const {isLoggedIn, isOwner, saveRedirectUrl,mapIn}=require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const validateListing=(req,res,next)=>
    {
    let {error}=ListingSchema.validate(req.body);
    if(error)
    {
        throw new ExpressError(400,error);
    }           
    else
        next();
}

router.route("/")
        .get( wrapAsync(listingController.index))//index route
        .post(isLoggedIn,
                upload.single("listing[image]"),
                validateListing,
                wrapAsync(listingController.newListing));// create route

// new listings // it is placed above show route because it remembers as :id 
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
        .get(wrapAsync(listingController.showListing))//show route
        .put(isLoggedIn,isOwner,upload.single("listing[image]")
        ,validateListing,wrapAsync(listingController.updateListing))//update route
        .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));//delete route
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;