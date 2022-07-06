const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const catchAsyncErrors = require("./catchAsyncErrors")
const ErrorHandler = require("../utils/errorhandler")

exports.authenticate = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.jwtoken
    console.log(req.cookies);
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
    const rootUser = await User.findOne({_id:verifyToken._id})

    if(!rootUser){throw new Error("User not found!")}

    req.token = token;
    req.rootUser = rootUser;
    req.iserID = rootUser._id;
    next();
})