import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createBlogs, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "./blogs.controller";
import { blogSchema, updateBlogSchema } from "./blogs.validation";

export const blogsRoutes = Router();


blogsRoutes.post( "/create-blog", validateRequest( blogSchema ), createBlogs );

blogsRoutes.get( "/get-blog/:id", getBlogById );

blogsRoutes.get( "/all-blogs", getAllBlogs );

blogsRoutes.patch( "/update-blog/:id", validateRequest(updateBlogSchema), updateBlog );

blogsRoutes.delete( "/delete-blog/:id", deleteBlog );