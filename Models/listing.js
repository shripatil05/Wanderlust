const mongoose=require("mongoose");
const Review = require("./review.js");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title: {
        type:String,
        required:true,
    },
    description: String,
   image:{
        url:String,
        filename:String,
   },
    price:Number,
    location:String,
    country:String,
    contact:{
        type:Number,
        maxLength:[10,"Contact Number should have 10 Numbers"],
        minLength:[10,"Contact Number should have 10 Numbers"],
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
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.review}});
    }
});


const Listing = mongoose.model("Listing",listingSchema);
module.exports= Listing;