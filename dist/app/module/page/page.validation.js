"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonalInfo = exports.personalInfoSchema = void 0;
const zod_1 = require("zod");
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
exports.personalInfoSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be at most 100 characters" }),
    address: zod_1.z
        .string()
        .trim()
        .max(300, { message: "Address must be at most 300 characters" })
        // .optional()
        // .nullable()
        .transform((v) => (v === "" ? null : v)),
    phone: zod_1.z
        .string()
        .trim()
        // .optional()
        // .nullable()
        .refine((v) => {
        if (!v)
            return true;
        return phoneRegex.test(v);
    }, { message: "Phone must be a valid international number (e.g. +8801XXXXXXXXX)" }),
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "Email must be a valid email address" })
        .max(254, { message: "Email is too long" }),
    title: zod_1.z
        .string()
        .trim()
        .max(120, { message: "Title must be at most 120 characters" })
        // .optional()
        // .nullable()
        .transform((v) => (v === "" ? null : v)),
});
exports.updatePersonalInfo = exports.personalInfoSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
