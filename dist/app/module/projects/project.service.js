"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectByIdService = exports.createProjectService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const slugify_1 = __importDefault(require("slugify"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
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
