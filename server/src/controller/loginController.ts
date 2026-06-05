import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import user from "../models/user.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }
  const haveuser = await user.findOne({ username });
  if (!haveuser) {
    res.status(401).json({ message: "Invalid credentials" });
    return; // Return void
  }
  const isRightPassword = await bcrypt.compare(password, haveuser?.password);

  if (!isRightPassword) {
    res.status(401).json({ message: "Invalid credentials" });
    return; // Return void
  }

  const accessToken = jwt.sign(
    { id: haveuser._id, username: haveuser.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { id: haveuser._id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" },
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15* 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    accessToken,
    message: "Login successful",
  });
});

export const logout = (req:Request, res:Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
  });
};