const express = require("express");
const dotenv = require("dotenv")
const connectDB  = require("./db/conn")
const app = express()

dotenv.config({path:"./.env"})

// importing routes:
const userRoutes = require("./routes/userRoutes")
const imageRoutes = require("./routes/imageRoutes")

const port = process.env.PORT

// DATABASE CONNECTION
connectDB()

app.use(express.json())
app.use("/api/v1",userRoutes)
app.use("/api/v1",imageRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port number ${port}`);
})
