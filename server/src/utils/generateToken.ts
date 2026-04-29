import type { Response } from "express";
import jwt from "jsonwebtoken"

export const generateToken = async (res:Response,userId:string) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET!,{
        expiresIn: "7d"
    });

    res.cookie("token",token,{
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV==="production",
        maxAge: 24*60*60*1000
    })
}