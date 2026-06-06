import type{ Request, Response } from "express";
import jwt from 'jsonwebtoken'
import user from "../models/user.js";
export const refresh=async(req:Request,res:Response)=>{
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: string };

    const foundUser = await user.findById(decoded.id);

    if (!foundUser) {
      return res.status(403).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

res.cookie("accessToken", newAccessToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 15 * 60 * 1000,
});

return res.json({ success: true });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};