import mongoose from "mongoose";
import bcrypt from "bcrypt";
import user from "../src/models/user.ts";

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bamboo");

    console.log("connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    console.log("creating admin...");

    const result = await user.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("INSERT RESULT:", result);

    const all = await user.find();
    console.log("ALL USERS:", all);

    await mongoose.disconnect();

    process.exit(0);
  } catch (err) {
    console.error("SEED ERROR:", err);
    process.exit(1);
  }
};

run();