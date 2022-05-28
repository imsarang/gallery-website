const mongoose = require("mongoose")
const validator = require("validator")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
   
    profile_pic:{
        type:String
    },
    firstname:{
        type:String,
        required:[true,"Please enter your firstname"]
    },

    lastname:{
        type:String,
        required:[true,"Please enter your lastname"]
    },

    email:{
        type:String,
        required:[true,"Please enter your email Id!"],
        validate:[validator.isEmail,"Please enter your email!"],
        unique:true
    },

    username:{
        type:String,
        maxLength:[20,"Maximum Length : 20"],
        required:true,
        unique:true
    },

    occupation:{
        type:String,
        maxLength:[30,"Max Length : 30"],
    },

    dob:{
        day:{
            type:Number,
            required:true
        },
        month:{
            type:Number,
            required:true
        },
        year:{
            type:Number,
            required:true
        }
    },

    country:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
        minLength:[8,"Password should have minimum 8 characters"],
        maaxLength:[20,"Password should have maximum 20 characters"],
        unique:true
    },

    liked_images:[{
        image_id:{
            type:Number,
            
        },
        
    }],
    disliked_images:[{
        image_id:{
            type:Number,
        }
    }],

    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
})

// Hashing of password
userSchema.pre("save",async function(next){
    
    if(!this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
    
})

// JWT TOKEN:
userSchema.methods.getJWTToken =async function(){
    return await jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// comparing password : login password and registered password:
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
module.exports = mongoose.model("User",userSchema)

