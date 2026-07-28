const express=require("express");
const router=express.Router();
const wrapAsync=require("../utills/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utills/ExpressError.js");
const Listing=require("../models/listing.js");
const { isLoggedIn ,isOwer ,validateListing } = require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })

const listingController=require("../controllers/listings.js");

router
  .route("/")
  .get(
    wrapAsync(listingController.index)) //index route
  .post(
      isLoggedIn,  
      upload.single("listing[image]"),
      validateListing,
      wrapAsync(listingController.createListing) //create route  
  );
 
//New Route
router.get("/new",
  isLoggedIn,
  listingController.renderNewForm
);

router.route("/:id")
  .get(
    wrapAsync(listingController.showListing //show route
  ))
  .put(
    isLoggedIn,
    isOwer,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing //update route
  ))
  .delete(
    isLoggedIn,
    isOwer,
    wrapAsync( listingController.deletaLising)//delete route
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwer,
  wrapAsync(listingController.renderEditForm));

module.exports=router;