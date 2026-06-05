import { Router } from "express";
import { login, logout } from "../controller/loginController.ts";
import authMiddleware from "../utils/authMiddleware.ts";
import type { AuthRequest } from "../utils/authMiddleware.ts";

import { refresh } from "../controller/refreshController.ts";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
} from "../controller/postController.ts";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controller/categoryController.ts";
import { sendContactEmail } from "../controller/contactController.ts";

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