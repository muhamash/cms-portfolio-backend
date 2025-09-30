"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getAllBlogs = exports.getBlogById = exports.createBlogs = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const App_error_1 = require("../../../config/errors/App.error");
const controller_util_1 = require("../../utils/controller.util");
const blogs_service_1 = require("./blogs.service");
exports.createBlogs = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const createdBlog = await (0, blogs_service_1.createBlogService)(req.body);
    if (!createdBlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to create a blog!!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Created a blog",
        statusCode: http_status_codes_1.default.CREATED,
        data: createdBlog
    });
});
exports.getBlogById = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Id not provided!!");
    }
    const blog = await (0, blogs_service_1.getBlogByIdService)(id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Found a blog",
        statusCode: http_status_codes_1.default.OK,
        data: blog
    });
});
exports.getAllBlogs = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    const blogs = await (0, blogs_service_1.getAllBlogsService)(query);
    if (!blogs) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Unable to get all blogs!!");
    }
    if (blogs.data?.length === 0) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Blogs are empty!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Get all blogs",
        statusCode: http_status_codes_1.default.OK,
        data: blogs
    });
});
exports.updateBlog = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Id not provided!!");
    }
    const updatedBlog = await (0, blogs_service_1.updateBlogService)(id, req.body);
    (0, controller_util_1.responseFunction)(res, {
        message: "Blog updated successfully",
        statusCode: http_status_codes_1.default.ACCEPTED,
        data: updatedBlog
    });
});
exports.deleteBlog = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Id not provided!!");
    }
    const deleteABlog = await (0, blogs_service_1.deleteBlogService)(id);
    if (!deleteABlog) {
        throw new App_error_1.AppError(http_status_codes_1.default.CONFLICT, "Unable to delete blog!!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Blog deleted",
        statusCode: http_status_codes_1.default.ACCEPTED,
        data: deleteABlog
    });
});
