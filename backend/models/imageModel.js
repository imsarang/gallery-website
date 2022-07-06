const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    image_url:[{
        type:String,
        required:true
    }],
    caption:{
        type:String,
        maxLength:[50,"Caption should be maximum of 50 words"],
        required:true
    },
    name:{
        type:String,
        
    },
    likes:{
        type:Number,
    },
    dislikes:{
        type:Number,
    },
    created_by:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    liked_images:[{
        user_name : String
    }],
    disliked_images:[{
        user_name : String
    }]
})

module.exports = mongoose.model("Image",imageSchema)