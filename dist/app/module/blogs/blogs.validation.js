"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    title: zod_1.z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be at most 100 characters"),
    content: zod_1.z
        .string()
        .min(1, "Content is required")
        .max(30000, "Content must be at most 30000 characters"),
    // image: z.string().url("Image must be a valid URL").optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.updateBlogSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(1, "min 1 char is required").max(100, "Title must be at most 100 characters").optional(),
    content: zod_1.z.string().min(1, "min 1 is required").max(30000, "Content must be at most 30000 characters").optional(),
    // image: z.string().url( "Image must be a valid URL" ).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
})
    .refine((data) => Object.values(data).some((val) => val !== undefined), { message: "At least one field must be provided for update" });
