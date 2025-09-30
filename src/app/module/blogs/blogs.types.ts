import z from "zod";
import { blogSchema, updateBlogSchema } from "./blogs.validation";

export type BlogTypes = z.infer<typeof blogSchema>;
export type UpdateBlogTypes = z.infer<typeof updateBlogSchema>;

export interface BlogQueryParams {
  search?: string;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}