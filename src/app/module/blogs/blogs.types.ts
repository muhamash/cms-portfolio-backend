import z from "zod";
import { blogSchema, updateBlogSchema } from "./blogs.validation";

export type BlogTypes = z.infer<typeof blogSchema>;
export type UpdateBlogTypes = z.infer<typeof updateBlogSchema>;