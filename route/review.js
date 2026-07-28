const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utills/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../utills/ExpressError.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewConatroller=require("../controllers/reviews.js");

//new reviews
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewConatroller.createReview));

//delete reviews
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewConatroller.deleteReview))

module.exports=router;