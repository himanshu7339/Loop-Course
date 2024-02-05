import mongoose from "mongoose"



export const connectDb = async() =>{

    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"loop-courses"
        })  
        console.log("Mongodb connect successfully")
    } catch (error) {
        console.log(error,"Mongodb")
    }
     
}