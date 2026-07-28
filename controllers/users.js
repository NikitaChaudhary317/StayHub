const User=require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new User({username,email});
        const registeredUser=await User.register(newuser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to StayHub");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }   
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success" , "Welcome back again to WanderLust! You are logged in! ");
    let redirecturl=res.locals.redirectURL || "/listings";
    res.redirect(redirecturl);     
}

module.exports.logOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","logged you out!!");
    res.redirect("/listings");
    });
}