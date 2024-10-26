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

module.exports.mapIn= function getCoordinates(city)
        {
           let weatherUrl=process.env.WEATHER_API_URL;
           let weatherApiKey=process.env.WEATHER_API_KEY;
           let getWeatherData=async()=>
            {
                let response=await fetch(`${weatherUrl}?q=${city}&limit=1&appid=${weatherApiKey}`);
                let jsonResponse=await response.json();

                let cordinates={
                    latitude:jsonResponse[0].lat,
                    longitude:jsonResponse[0].lon,
                }
                // console.log(jsonResponse[0].lat,"and ",jsonResponse[0].lon);
                // let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${jsonResponse[0].lat}&lon=${jsonResponse[0].lon}&appid=${ApiKey}&units=metric`);
                   
                // let weatherInfo=await fetch(data.url);
                // let weatherInfoJson=await weatherInfo.json();
                return cordinates;
            }
         let cord=getWeatherData();
         return cord;
        }  