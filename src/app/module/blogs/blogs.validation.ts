import { z } from "zod";

export const blogSchema = z.object({
  id: z.number().optional(), 
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(30000, "Content must be at most 30000 characters"),
  // image: z.string().url("Image must be a valid URL").optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const updateBlogSchema = z
    .object( {
        title: z.string().min(1, "min 1 char is required").max( 100, "Title must be at most 100 characters" ).optional(),
        content: z.string().min(1, "min 1 is required").max( 30000, "Content must be at most 30000 characters" ).optional(),
        // image: z.string().url( "Image must be a valid URL" ).optional(),
        tags: z.array( z.string() ).optional(),
    } )
    .refine(
        ( data ) => Object.values( data ).some( ( val ) => val !== undefined ),
        { message: "At least one field must be provided for update" }
    );