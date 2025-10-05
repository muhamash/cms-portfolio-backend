"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEducationSchema = exports.createEducationSchema = exports.updateExperienceSchema = exports.createExperienceSchema = exports.updateHeaderStats = exports.headerStats = exports.headerSkillSchema = exports.updateHeaderSchema = exports.headerSchema = exports.updateSkillSchema = exports.skillSchema = exports.updateSocialSchema = exports.socialLinkSchema = exports.updatePersonalInfo = exports.personalInfoSchema = void 0;
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
exports.socialLinkSchema = zod_1.z.object({
    platform: zod_1.z
        .string()
        .min(2, "Platform name must be at least 2 characters")
        .max(50, "Platform name must be less than 50 characters"),
    url: zod_1.z
        .string()
        .url("Must be a valid URL")
        .min(5, "URL must be at least 5 characters")
});
exports.updateSocialSchema = exports.socialLinkSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
exports.skillSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Skill name must be at least 2 characters long")
        .max(50, "Skill name must be less than 50 characters"),
});
exports.updateSkillSchema = exports.skillSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
exports.headerSchema = zod_1.z.object({
    headerText: zod_1.z
        .string()
        .min(2, "Header text must be at least 2 characters")
        .max(100, "Header text too long"),
    headerSubTitle: zod_1.z
        .string()
        .min(2, "Header subtitle must be at least 2 characters")
        .max(150, "Header subtitle too long"),
    headerAboutText: zod_1.z
        .string()
        .min(2, "Header about text must be at least 2 characters")
        .max(200, "Header about text too long"),
    headerAboutSubText: zod_1.z
        .string()
        .min(2, "Header about sub text must be at least 2 characters")
        .max(200, "Header about sub text too long"),
    headerAboutAddress: zod_1.z
        .string()
        .min(5, "Header address must be at least 5 characters")
        .max(200, "Header address too long"),
    headerAboutSubTitle: zod_1.z
        .string()
        .min(2, "Header about subtitle must be at least 2 characters")
        .max(150, "Header about subtitle too long"),
});
exports.updateHeaderSchema = exports.headerSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
exports.headerSkillSchema = zod_1.z.object({
    skill: zod_1.z
        .string()
        .min(2, "Skill name must be at least 2 characters long")
        .max(50, "Skill name must be less than 50 characters"),
});
exports.headerStats = zod_1.z.object({
    label: zod_1.z
        .string()
        .min(2, "label name must be at least 2 characters long")
        .max(50, "label name must be less than 50 characters"),
    value: zod_1.z
        .string()
        .min(2, "value name must be at least 20 characters long")
        .max(50, "value name must be less than 50 characters"),
});
exports.updateHeaderStats = exports.headerStats.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
exports.createExperienceSchema = zod_1.z.object({
    position: zod_1.z.string().min(1, "Position is required"),
    company: zod_1.z.string().min(1, "Company is required"),
    description: zod_1.z.string().optional(),
    timeLine: zod_1.z.string().min(1, "Timeline is required"),
});
exports.updateExperienceSchema = exports.createExperienceSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
exports.createEducationSchema = zod_1.z.object({
    degree: zod_1.z.string().min(1, "Degree is required"),
    institute: zod_1.z.string().min(1, "Institute is required"),
    timeLine: zod_1.z.string().min(1, "Timeline is required"),
    description: zod_1.z.string().optional(),
});
exports.updateEducationSchema = exports.createEducationSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});
