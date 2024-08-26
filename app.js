if(process.env.NODE_ENV!="production")
    require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const app=express();

const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const dbUrl=process.env.ATLASDB_URL;
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>
{
    console.log("Error in mongo session store",err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:
    {
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));//to use css files

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs",ejsMate);   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


main().then(()=>
{
    console.log("mongoose connected");
}).catch((err)=>{
    console.log(err);
});


async function main()
    {
    await mongoose.connect(dbUrl);
    };

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
    });
//use after all uses
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

//demo user route
// app.get("/demouser",async(req,res)=>
//     {
//         const fakeUser=new User({
//             email:"abhi@123",
//             username:"dhakad"
//         });
//     let registeredUser=await User.register(fakeUser,"helloWorld");
//         console.log(registeredUser);
//     });

app.get("/",(req,res)=>
{
    res.send("root is working");
});

//for invalid route
app.all("*",(req,res,next)=>
    {
        next(new ExpressError(404,"page not found"));
    });
app.use((err,req,res,next)=>{
    let{status=500,message='something went wrong'}=err;
    res.status(status).render("listings/error.ejs",{err});
});
app.listen(8080,()=>
{
    console.log("app is listening at port 8080");
});

