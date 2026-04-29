import mongoose from "mongoose"

export const connectDB = async() => {
    let DB_CONNECTION_STRING = ""

    if(process.env.NODE_ENV==="development"){
        DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URI!
    }
    if(process.env.NODE_ENV==="production"){
        DB_CONNECTION_STRING = process.env.MONGODB_URI!
    }

    try {
        const res = await mongoose.connect(DB_CONNECTION_STRING)
        console.log("Database connected.",res.connection.host)
    } catch (error) {
        console.log("DB connection error.",error);
        process.exit(1)
    }
}