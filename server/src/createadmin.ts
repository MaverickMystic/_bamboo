import dotenv from "dotenv"; 
// 2. Initialize dotenv configuration
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// 1. Add this import
import user from "../src/models/user.js";



const run = async () => {
  try {
    // 3. Use the cloud string or fall back to local
    const dbURI = process.env.MONGODB_URI;
     if(!dbURI){
      console.log("errror ");
      process.exit(1);
     }
    console.log("Connecting to database...");
    await mongoose.connect(dbURI);

    console.log("Connected successfully!");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    console.log("Creating admin user...");

    const result = await user.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("INSERT RESULT:", result);

    const all = await user.find();
    console.log("ALL USERS IN DATABASE:", all);

    await mongoose.disconnect();
    console.log("Disconnected from database cleanly.");
    process.exit(0);
  } catch (err) {
    console.error("SEED ERROR:", err);
    process.exit(1);
  }
};

run();