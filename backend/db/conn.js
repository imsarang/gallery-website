const mongoose = require("mongoose");

const DB = process.env.MONGO_URI

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Photography",{
            useNewUrlParser : true,
            useUnifiedTopology:true,
        })
        console.log(`Mongo DB connection success`);
    }catch(e){
        console.log(`Mongo DB connection failed!`);
        console.log(e);
    }
}

module.exports = connectDB