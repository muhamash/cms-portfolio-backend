"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjectsService = exports.deleteProjectService = exports.updateProjectByIdService = exports.getProjectByIdService = exports.createProjectService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const slugify_1 = __importDefault(require("slugify"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const queryBuilder_1 = require("../../utils/queryBuilder");
const projects_constants_1 = require("./projects.constants");
const createProjectService = async (payload) => {
    let slug = (0, slugify_1.default)(payload.title, {
        lower: true,
        strict: true,
    });
    console.log(payload, slug);
    const existing = await getPrisma_1.myPrisma.blog.findUnique({ where: { slug } });
    if (existing) {
        slug = `${slug}-${Date.now()}`;
    }
    const createProject = await getPrisma_1.myPrisma.project.create({
        data: {
            ...payload,
            image: payload.image[0],
            slug
        }
    });
    return createProject;
};
exports.createProjectService = createProjectService;
const getProjectByIdService = async (id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Project ID must be a valid number.");
    }
    const project = await getPrisma_1.myPrisma.project.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!project) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Target project not found!");
    }
    return project;
};
exports.getProjectByIdService = getProjectByIdService;
const updateProjectByIdService = async (id, payload) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Project ID must be a valid number.");
    }
    const existingProject = await getPrisma_1.myPrisma.project.findUnique({
        where: { id: Number(id) },
    });
    if (!existingProject) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Project not found!");
    }
    let updatedSlug = existingProject.slug;
    if (payload.title && payload.title !== existingProject.title) {
        let slug = (0, slugify_1.default)(payload.title, { lower: true, strict: true });
        //  unique slug
        const existingSlug = await getPrisma_1.myPrisma.project.findUnique({ where: { slug } });
        if (existingSlug && existingSlug.id !== Number(id)) {
            slug = `${slug}-${Date.now()}`;
        }
        updatedSlug = slug;
    }
    const updatedProject = await getPrisma_1.myPrisma.project.update({
        where: { id: Number(id) },
        data: {
            ...payload,
            image: payload.image[0],
            slug: updatedSlug,
        },
    });
    if (!updatedProject) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Failed to update the project!");
    }
    return updatedProject;
};
exports.updateProjectByIdService = updateProjectByIdService;
const deleteProjectService = async (id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const existingProject = await getPrisma_1.myPrisma.project.findUnique({
        where: { id: Number(id) },
    });
    if (!existingProject) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Project not found!");
    }
    const deletedProject = await getPrisma_1.myPrisma.project.delete({
        where: { id: Number(id) },
    });
    return deletedProject;
};
exports.deleteProjectService = deleteProjectService;
const getAllProjectsService = async (query) => {
    const builder = new queryBuilder_1.PrismaQueryBuilder({
        model: getPrisma_1.myPrisma.project,
        searchableFields: projects_constants_1.PROJECT_SEARCHABLE_FIELDS,
        filterableFields: projects_constants_1.PROJECT_FILTERABLE_FIELDS,
        arrayFields: projects_constants_1.PROJECT_ARRAY_FIELDS,
        excludeFields: projects_constants_1.PROJECT_EXCLUDED_FIELDS,
        search: query?.search,
        sortBy: query?.sortBy || projects_constants_1.PROJECT_DEFAULT_SORT_FIELD,
        sortOrder: query?.sortOrder || projects_constants_1.PROJECT_DEFAULT_SORT_ORDER,
        page: query?.page ? Number(query.page) : projects_constants_1.PROJECT_DEFAULT_PAGE,
        limit: query?.limit ? Number(query.limit) : projects_constants_1.PROJECT_DEFAULT_LIMIT,
        filters: query || {},
    });
    return builder
        .fields(["id", "title", "description", "slug", "tags", "image", "createdAt", "githubLink", "liveLink", "updatedAt"])
        .sort()
        .pagination()
        .build();
};
exports.getAllProjectsService = getAllProjectsService;
