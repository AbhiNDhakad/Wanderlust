const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>
    {
        res.render("users/signup.ejs");
    }

module.exports.signup=async(req,res)=>
    {
        try{
            let {username,email,password}=req.body;
            let user1=new User({username,email});
           let registeredUser= await User.register(user1,password);
           req.login(registeredUser,(err)=>
                {
                    if(err) return next();
                    req.flash("success","you are a wanderlust user");
                    res.redirect("/listings");
                })
        }
        catch(e)
        {
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    }
module.exports.renderLoginForm=(req,res)=>
    {
        res.render("users/login.ejs");
    }
module.exports.login=async(req,res)=>
    {
        req.flash("success","Welcome! to Wanderlust");
        let redirectUrl=res.locals.redirectUrl || "/listings"  //listings se agar login kia to waha par res.locals.redirectUrl is undefined
        res.redirect(redirectUrl);   
    }
module.exports.logout=(req,res)=>
    {
        req.logout((err)=>
        {
            if(err)  return next();
            req.flash("success","you are logged out successfully");
            res.redirect("/listings");
        });
    }