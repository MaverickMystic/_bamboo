import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      username: string;
    };

    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;