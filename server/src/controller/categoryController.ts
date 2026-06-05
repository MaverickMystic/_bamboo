import type { Request, Response } from "express";
import Category from "../models/category.ts";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    return res.json({ success: true, categories });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }

    const category = await Category.create({ name: name.trim() });

    return res.status(201).json({ success: true, category });
  } catch (error: any) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name already exists",
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.json({ success: true, deletedId: id });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};