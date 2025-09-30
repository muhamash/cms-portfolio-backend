"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogService = exports.updateBlogService = exports.getBlogByIdService = exports.createBlogService = exports.getAllBlogsService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const slugify_1 = __importDefault(require("slugify"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const queryBuilder_1 = require("../../utils/queryBuilder");
const blog_constants_1 = require("./blog.constants");
const getAllBlogsService = async (query) => {
    const builder = new queryBuilder_1.PrismaQueryBuilder({
        model: getPrisma_1.myPrisma.blog,
        searchableFields: blog_constants_1.BLOG_SEARCHABLE_FIELDS,
        excludeFields: blog_constants_1.BLOG_EXCLUDED_FIELDS,
        search: query?.search,
        sortBy: query?.sortBy || blog_constants_1.BLOG_DEFAULT_SORT_FIELD,
        sortOrder: query?.sortOrder || blog_constants_1.BLOG_DEFAULT_SORT_ORDER,
        page: query?.page ? Number(query.page) : blog_constants_1.BLOG_DEFAULT_PAGE,
        limit: query?.limit ? Number(query.limit) : blog_constants_1.BLOG_DEFAULT_LIMIT,
    });
    const result = await builder
        .fields(["id", "title", "content", "slug", "tags", "image", "createdAt"])
        .sort()
        .pagination()
        .build();
    // console.log( result );
    return result;
};
exports.getAllBlogsService = getAllBlogsService;
const createBlogService = async (payload) => {
    let slug = (0, slugify_1.default)(payload.title, {
        lower: true,
        strict: true,
    });
    const existing = await getPrisma_1.myPrisma.blog.findUnique({ where: { slug } });
    if (existing) {
        slug = `${slug}-${Date.now()}`;
    }
    const createdBlog = await getPrisma_1.myPrisma.blog.create({
        data: {
            title: payload.title,
            content: payload.content,
            image: payload.image,
            tags: payload.tags ?? [],
            slug: slug
        },
    });
    // console.log( createdBlog )
    if (!createdBlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Can not create the blog!!");
    }
    return createdBlog;
};
exports.createBlogService = createBlogService;
const getBlogByIdService = async (id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Project ID must be a valid number.");
    }
    const getBlog = await getPrisma_1.myPrisma.blog.findUnique({
        where: {
            id: Number(id)
        }
    });
    // console.log(getBlog)
    if (!getBlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    }
    return getBlog;
};
exports.getBlogByIdService = getBlogByIdService;
const updateBlogService = async (id, payload) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Project ID must be a valid number.");
    }
    // Fetch the existing blog
    const existingBlog = await getPrisma_1.myPrisma.blog.findUnique({
        where: { id: Number(id) },
    });
    if (!existingBlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Blog not found!");
    }
    // If title is updated, regenerate slug
    let updatedSlug = existingBlog.slug;
    if (payload.title && payload.title !== existingBlog.title) {
        let slug = (0, slugify_1.default)(payload.title, { lower: true, strict: true });
        //  unique slug
        const existingSlug = await getPrisma_1.myPrisma.blog.findUnique({ where: { slug } });
        if (existingSlug && existingSlug.id !== Number(id)) {
            slug = `${slug}-${Date.now()}`;
        }
        updatedSlug = slug;
    }
    const updatedBlog = await getPrisma_1.myPrisma.blog.update({
        where: { id: Number(id) },
        data: {
            ...payload,
            slug: updatedSlug,
        },
    });
    if (!updatedBlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Failed to update the blog!");
    }
    return updatedBlog;
};
exports.updateBlogService = updateBlogService;
const deleteBlogService = async (id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Project ID must be a valid number.");
    }
    const existingBlog = await getPrisma_1.myPrisma.blog.findUnique({
        where: { id: Number(id) },
    });
    if (!existingBlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Blog not found!");
    }
    // Delete the blog
    const deletedBlog = await getPrisma_1.myPrisma.blog.delete({
        where: { id: Number(id) },
    });
    return deletedBlog;
};
exports.deleteBlogService = deleteBlogService;
