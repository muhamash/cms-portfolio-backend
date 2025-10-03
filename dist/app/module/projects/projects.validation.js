"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters"),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(30000, "Description must be at most 30000 characters"),
    // image: z.string().url( "Image must be a valid URL" ).optional(),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, "Tag cannot be empty"))
        .min(1, "At least one tag is required"),
    githubLink: zod_1.z.string().url("GitHub link must be a valid URL"),
    liveLink: zod_1.z.string().url("Live link must be a valid URL"),
});
exports.updateProjectSchema = exports.createProjectSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
