const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

if(process.env.NODE_ENV !="production"){
  require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError=require("./utills/ExpressError.js");
const session = require('express-session');
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const validCategories = require("./utills/categories");

const listingRouter=require("./route/listing.js");
const reviewRouter=require("./route/review.js");
const userRouter=require("./route/user.js");

const { getMaxListeners } = require("cluster");

app.use(express.json());

const dbUrl=process.env.ATLASDB_URL;
const secret=process.env.SESSION_SECRET;
const PORT = process.env.PORT || 8080;

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB Error:");
    console.error(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
  console.log("MongoDB Connected");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:secret,
  },
  touchAfter:24*60*60,
});

store.on("error",(err)=>{
  console.log("ERROR in MONGO SESSION",err);
});

const sessionOptions={
  store,
  secret,
  resave:false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  res.locals.search = req.query.search || "";
  res.locals.category = req.query.category || "";
  res.locals.validCategories = validCategories;

  const currPath = req.path;
  res.locals.showSearchBar =
    currPath === "/listings" ||
    (currPath.startsWith("/listings/") && !currPath.endsWith("/edit") && currPath !== "/listings/new");
  next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//Page not found, if none of the above files executes
app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//Error handling middleware
app.use((err,req,res,next)=>{
  let  {statusCode=500,message="Something Went wrong"}=err;
  res.status(statusCode).render("error.ejs",{message});
})

app.listen(PORT,()=>{
    console.log("App is running in the port 8080");
});