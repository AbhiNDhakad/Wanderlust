const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Review=require("./review.js");
const { ListingSchema } = require("../schema");
const listSchema=new schema({
    title :{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:{
            type:String,
            default:"listingImage"
        },
        url:
        {
            type:String,
            default:"https://www.istockphoto.com/photo/xl-migrating-canada-geese-gm136917788-13312220?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fnature&utm_medium=affiliate&utm_source=unsplash&utm_term=nature%3A%3A%3A"
        }
        },
    price:Number, 
    location :
        {
            street:{
                type:String,
                default:""
            },
            colony:{
                type:String,
                default:""
            },
            city:{
                type:String,
                default:""
            }
        },
    country:String,
    reviews:[{
        type:schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    }
});

listSchema.post("findOneAndDelete",async(listing)=>
{if(listing){
    
    await Review.deleteMany({_id:{$in:listing.reviews}});
}
});

const Listing=mongoose.model("Listing",listSchema);
module.exports=Listing;