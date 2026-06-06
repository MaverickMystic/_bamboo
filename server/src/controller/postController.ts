import type{ Request, Response } from "express"
import Post from "../models/post.js"
import { extractTextPreview, findFirstImage } from "../utils/helpers.js"
import Category from "../models/category.js"
import {getCloudinary} from "../utils/cloudinary.js";
import { extractCloudinaryPublicIds } from "../utils/helpers.js";

type CategoryType = { _id: string; name: string } | null;
type PostType = {
  _id: string;
  title: string;
  createdAt: Date;
  document: any;
  category: CategoryType;
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title,category, document, html } = req.body

    if (!title ||!category|| !document || !html) {
      return res.status(400).json({
        success: false,
        message: "title,categoryId, document and html are required",
      })
    }
      const dbcategory = await Category.findById(category);
    if (!dbcategory) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }
    const post = await Post.create({
      title,
     category,
      document,
      html,
    })

    return res.status(201).json({
      success: true,
      post,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export const getPostById = async (req: Request, res: Response) => {
  try {

    const post = await Post.findById(req.params.id).populate("category", "name");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    return res.json({
      success: true,
      post,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllPost = async (req: Request, res: Response) => 
  {
  try {
    
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 5, 20);
    const skip = (page - 1) * limit;
const [posts, total] = await Promise.all([
  Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("title document createdAt category")
    .populate("category", "name")
    .lean<PostType[]>(),
  Post.countDocuments(),
]);
  const formattedPosts = posts.map((post) => {
  const media = findFirstImage(post.document);
       const categoryName =
        typeof post.category === "object" && post.category?.name
          ? post.category.name
          : "uncategorized";
  
  return {
    _id: post._id,
    title: post.title,
    category: categoryName,
    createdAt: post.createdAt,
    previewImage: media?.src || "https://picsum.photos/400/200", 
    previewText: extractTextPreview(post.document, 170),
  };
});;
    return res.json({
      success: true,
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Post ID is required" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const publicIds = extractCloudinaryPublicIds(post.document);

    await post.deleteOne();

    if (publicIds.length > 0) {
      const results = await Promise.allSettled(
        publicIds.map((pid) => getCloudinary().uploader.destroy(pid))
      );

      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          console.log(`Deleted Cloudinary asset ${publicIds[i]}:`, result.value);
        } else {
          console.error(`Failed to delete Cloudinary asset ${publicIds[i]}:`, result.reason);
        }
      });
    }

    return res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};