const express = require("express")
const User = require("../models/userModel")
const Image = require("../models/imageModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require('../utils/errorhandler');
const { sendToken } = require("../utils/jwtToken");
const { response } = require("express");
const bcrypt = require("bcryptjs")
const {OAuth2Client} = require("google-auth-library");
const { likeDislike } = require("./imageController");

const client = new OAuth2Client("64048467833-nrmng9jn48qrpsa1g0nffvg7pf8r48mt.apps.googleusercontent.com")

// register user
exports.createUser = catchAsyncErrors(async(req,res)=>{
    
        const {profile_pic,firstname,lastname,username,password,email,occupation,dob,country,liked_images,images_uploaded} = req.body;
        const hash_password = await bcrypt.hash(password,12)
        const user = await User.create({
            profile_pic:"",
            firstname,
            lastname,
            email,
            username,
            password:hash_password,
            occupation,
            dob,
            country,
            liked_images,
            images_uploaded            
        })
        
        if(user)res.status(200).json({
            success:true,
            message:"Successfully registered!"
        })
    
})

// display user details:
exports.showUser =catchAsyncErrors( async(req,res)=>{
    
        const user = await User.find()
        res.status(200).json({
            success:true,
            user
        })
    
})

exports.showUserByUser = catchAsyncErrors(async(req,res)=>{
    const username = req.params.username
    const user = await User.find({username:username})
    if(user)return res.status(201).json({
        success:true,
        user
    })
})

// delete user:
exports.deleteUser = catchAsyncErrors(async(req,res)=>{
    const response = await User.findOne(req.body.id)
    console.log(response.username);
    const user = await User.deleteOne(req.body.id)
    // const image_id = await Image.find()
    // console.log(image_id[0]._id);
    const image = await Image.deleteMany({created_by : response.username})
    res.status(200).json({
        succuss:true,
        message:"User Removed"
    })
})

// login

exports.userLogin = catchAsyncErrors(async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password)
    return res.status(401).json({
        success:false,
        message:"FILL ALL CREDENTIALS!"
    })
    const user = await User.findOne({username:username})
    if(user){
        const isMatched = await bcrypt.compare(password,user.password)
        if(isMatched)
            {
                sendToken(user,201,res)
                
            } 
        else
            return res.status(401).json({
                success:false,
                message:"INVALID USER!"
            })
    }else{
        return res.status(401).json({
            success:false,
            message:"INVALID USER!"
        })
    }
})

// logout
exports.userLogout = catchAsyncErrors(async(req,res)=>{
    res.cookie("token",null,{
        expire: new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({
        success:true,
        message:"LOGGED OUT!!"
    })
})

exports.googleLogin = catchAsyncErrors(async(req,res)=>{
    const {tokenId} = req.body;
    client.verifyIdToken({idToken:tokenId,audience: "64048467833-nrmng9jn48qrpsa1g0nffvg7pf8r48mt.apps.googleusercontent.com"})
    .then(response=>{
        const {email_verified,name,email} = response.payload;
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong!"
                    })
                }else{
                    if(user){
                        sendToken(user,201,res)
                    }
                }
            })
        }
    })

})


// edit Profile(update):
exports.addProfile= catchAsyncErrors(async(req,res)=>{
    const {profile_pic,firstname,lastname,username,email,occupation,country} = req.body;
    const user_id = await User.find({username:req.params.username})
    
    const user = await User.findByIdAndUpdate(user_id[0].id,
        {
            $set:{
                username,
                firstname,
                lastname,
                profile_pic,
                occupation,
                country,
                email
            }
        })
    if(user)res.status(201).json({
        success:"true",
        message:"user updated!",
        user
    })
})
