const { ref } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");
const User=require("./user.js");
const validCategories = require("../utills/categories");


let listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image: {
        filename:String,           
        url:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,       
    },
    country:{
        type:String,       
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    category: [
        {
            type: String,
            enum: validCategories
        }
    ],
})


//when listing is delete then their review also delete 
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
    if (listing.image?.url && listing.image.url.includes("res.cloudinary.com")) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;