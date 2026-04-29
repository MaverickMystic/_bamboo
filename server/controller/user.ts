import type { Request, Response } from "express";
import { User } from "../models/user.ts";
import { generateToken } from "../src/utils/generateToken.ts";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await existingUser.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(res, existingUser._id.toString());
    
    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      role: existingUser.role, // important
      
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logout" });
};

export const updatePassword = async (req: Request, res: Response) => {
  const { name, oldPassword, newPassword } = req.body;
  const existingUser = await User.findOne({ name });
  if (!existingUser) {
    res.status(400).json({ message: "User not Found" });
    return;
  }

  const isPwMatch = await bcrypt.compare(oldPassword, existingUser.password);
  if (!isPwMatch) {
    res.status(400).json({ message: "Old Password is not correct" });
    return;
  }

  existingUser.password = newPassword;
  await existingUser.save();
  res.status(200).json({ message: "Password updated." });
};
