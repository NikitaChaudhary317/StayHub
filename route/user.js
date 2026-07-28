const express=require("express");
const router=express.Router();
const wrapAsync=require("../utills/wrapAsync.js");
const User=require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const { render } = require("../controllers/users.js");
const userController=require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local',{   
            failureRedirect: '/login' ,
            failureflash:true
        }),
        userController.login
    );

router.get("/logout",userController.logOut);

module.exports=router;