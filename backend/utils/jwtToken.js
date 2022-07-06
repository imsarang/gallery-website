exports.sendToken = async (user,statusCode,res)=>{
    try{
        const token = await user.getJWTToken

        // options for cookies:
        const options = {
            expires:new Date(
                Date.now + process.env.COOKIE_EXPIRE*24*60*60*1000
            ),
            httpOnly:true,
        }
         res.status(statusCode).cookie('token',token,options).json({
            success:true,
            user,
            token
        })
    }catch(e){
        console.log(e);
    }
   
}


