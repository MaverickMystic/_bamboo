import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  password: string;
  role: "teacher" | "student";
  matchPassword(enteredPw: string): Promise<boolean>;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPw: string) {
  return await bcrypt.compare(enteredPw, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);