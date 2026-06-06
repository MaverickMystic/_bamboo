import { Router } from "express";
import { login, logout } from "../controller/loginController.js";
import authMiddleware from "../utils/authMiddleware.js";
import type { AuthRequest } from "../utils/authMiddleware.ts";

import { refresh } from "../controller/refreshController.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
} from "../controller/postController.js";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controller/categoryController.js";
import { sendContactEmail } from "../controller/contactController.js";

const router = Router();

/* ======================
   AUTH
====================== */
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
/* ======================
   PUBLIC READ ROUTES
====================== */
router.get("/posts", getAllPost);
router.get("/posts/:id", getPostById);
router.get("/categories", getCategories);
router.post("/contact",sendContactEmail)
/* ======================
   PROTECTED ROUTES (ADMIN ONLY)
====================== */
router.post("/publishpost", authMiddleware, createPost);
router.post("/categories", authMiddleware, createCategory);
router.delete("/categories/:id", authMiddleware, deleteCategory);
router.delete("/posts/:id", authMiddleware, deletePost);
/* ======================
   ME (SESSION CHECK)
====================== */
router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;