const Listing=require("../models/listing.js");

module.exports.index=async(req,res)=>
    {
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    }

module.exports.renderNewForm=(req,res)=>
    {
        res.render("listings/new.ejs");
    }

module.exports.showListing=  async(req,res)=>
        {
        const {id}=req.params;
        const list=await Listing.findById(id).populate({path:"reviews"
            ,populate:{
            path:"author"
            }
        }).populate("owner");
        if(!list)
        {
            req.flash("error","you requested listing for does not exist");
            res.redirect("/listings");
        }
        res.render("listings/show.ejs",{list});
    } 

module.exports.newListing=async(req,res,next)=>    
    {
        let url=req.file.path;
        let filename=req.file.filename;
        // console.log(url,"..",filename);
    const newListing= new Listing(req.body.listing);
    newListing.owner=req.user._id;//to  append owner details from  user
    newListing.image={filename,url};   
    await newListing.save();
    req.flash("success","new Listing created");
    res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>
    {
    const {id}=req.params;
    const list= await Listing.findById(id);
    let orignalImageUrl=list.image.url;
     orignalImageUrl=orignalImageUrl.replace("/upload","/upload/h_300,w_250");
     console.log(orignalImageUrl);
    if(!list){
        req.flash("error","you requested listing for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list,orignalImageUrl});
}
module.exports.updateListing=async(req,res)=>
    {
    const {id}=req.params; 
    let newListing=await Listing.findByIdAndUpdate(id,{...req.body.listing});// reconstruct editListing
        if(typeof req.file!="undefined")
            {
                let url=req.file.path;
                let filename=req.file.filename;
                newListing.image={url,filename};
               await newListing.save();
            }
    req.flash("success","Listing Updated");
    res.redirect("/listings");
    }
module.exports.destroyListing=async(req,res)=>
    {
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}
