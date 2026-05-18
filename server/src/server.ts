import mongoos from "mongoose"
import dotenv from "dotenv"
import app from "./app"
import mongoose from "mongoose"

dotenv.config()

const PORT = process.env.PORT || 5000
const startServer = async ()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("MongoDB Connected")

        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
        }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}
startServer()