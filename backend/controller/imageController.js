const Image = require("../models/imageModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// uploading image
exports.uploadImage = catchAsyncErrors(async(req,res)=>{
    const {image_url,caption,likes,dislikes,name,created_by,category} = req.body
    const image = await Image.create({
        image_url,
        caption,
        name,
        likes : 0,
        dislikes : 0,
        created_by,
        category
    })
    if(image)res.status(200).json({
        success:true,
        message:"image uploaded successfully"
    })
    
}) 
// deleting uploaded image
exports.deleteImage = catchAsyncErrors(async(req,res)=>{
    const image = await Image.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success:true,
        message:"image deleted successfully!"
    })
})

// delete image by image url
exports.deleteImageByUrl = catchAsyncErrors(async(req,res)=>{
    const image = await Image.findByIdAndDelete({image_url:req.params.image_url})
    console.log(image);
    if(image)res.status(201).json({
        success:true,
        message:"image deleted successfully",
        image
    })
})

// display images uploaded by a user
exports.getImageByUser = catchAsyncErrors(async(req,res)=>{
    const author = req.params.created_by
    const image = await Image.find({created_by : author})
    
    if(image) res.status(201).json({
        image
    })
    else{
        res.status(400).json({
            success:false,
            message:"Image not found!"
        })
    }
})
// display image by id
exports.getImageById = catchAsyncErrors(async(req,res)=>{
    const image = await Image.findById(req.params.id)
    if(image) res.status(201).json({
        success:true,
        image
    })
    else{
        res.status(400).json({
            success:false,
            message:"Image not found!"
        })
    }
})
// display all images
exports.getAllImage = catchAsyncErrors(async(req,res)=>{
    const image = await Image.find()
    if(image)res.status(200).json({
        success:true,
        image
    })
    else res.status(400).json({
        success:false,
        message:"No images found!"
    })
})


// get image by category:
exports.getImageByCategory = catchAsyncErrors(async(req,res)=>{
    
    const image = await Image.find({category:req.params.category})
    if(image) return res.status(201).json({
        success:true,
        image
    })
    else res.status(401).json({
        success:false,
        message:"No images found!"
    }) 
})

exports.addToChoice = catchAsyncErrors(async(req,res)=>{

    let Username = req.body.username
    const imageActual = await Image.findById(req.body._id)
    console.log();
    if(Username === 'null' || Username === 'undefined')
        Username='anonymous'
    if(req.params.choice === 'like')
    
    {
        const image = await Image.updateOne(req.body.id,
            {
                $addToSet:{
                    liked_images:{
                        $each:[{'user_name':Username}]
                    }
            },
                $pull:{
                    disliked_images:{
                        'user_name':Username
                    }
                }
            
        })
        res.status(201).json({
            success:true,
            message:'Image liked!',
            imageActual
        })
    }
    else if(req.params.choice === 'dislike')
    {
        await Image.updateOne(req.body.id,
            {
                $addToSet:{
                    disliked_images:{
                        $each:[{'user_name':Username}]
                    }
                },
                $pull:{
                    liked_images:{
                        'user_name':Username
                    }
                }
                
            })
        console.log(Username);
            res.status(201).json({
                success:true,
                message:'Image Disliked!',
                imageActual
            })
    }
    
})

// delete all responses
exports.removeChoices = catchAsyncErrors(async(req,res)=>{
    
     const image= await Image.findByIdAndUpdate(req.params.id,
            {
                $pull:{liked_images:{},disliked_images:{}}

            })
        res.status(201).json({
            success:true,
            message:"all responses removed!",
            image
        })
    
})