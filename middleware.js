const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review=require("./models/review.js");
const ExpressError=require("./utills/ExpressError.js");
const { cloudinary } = require("./cloudConfig");
const {listingSchema ,reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        if(req.method === "GET") {
            req.session.redirectUrl = req.originalUrl;
        } else {
            const referer = req.get('referer');
            if (referer) {
                const url = new URL(referer);
                req.session.redirectUrl = url.pathname + url.search;
            } else {
                req.session.redirectUrl = "/";
            }
        }
        req.flash("error","you must be logged in to add listing!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
};

module.exports.isOwer=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
    req.flash("error","Listing not found");
    return res.redirect("/listings");
  }
    if(! listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not owner of this lisitng");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//server side validation check for listing
module.exports.validateListing=async(req,res,next) => {
  let {error}=listingSchema.validate(req.body);  
  if(error){
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
}

//validation for server side review
module.exports.validateReview=(req,res,next) => {
  let {error}=reviewSchema.validate(req.body);  
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {reviewId,id}=req.params;
    let review=await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings${id}`);
    }
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
