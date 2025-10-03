"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.deleteProject = exports.updateProjectById = exports.getProjectById = exports.createProject = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const App_error_1 = require("../../../config/errors/App.error");
const controller_util_1 = require("../../utils/controller.util");
const project_service_1 = require("./project.service");
exports.createProject = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    // console.log(req.body)
    let uploadedFiles = [];
    if (Array.isArray(req.files)) {
        uploadedFiles = req.files.map(f => f.path);
    }
    else if (req.files && typeof req.files === "object") {
        uploadedFiles = Object.values(req.files).flat().map(f => f.path);
    }
    const project = await (0, project_service_1.createProjectService)({ ...req.body, image: uploadedFiles }, user.id);
    if (!project) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Unable to create the project");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Created a project",
        statusCode: http_status_codes_1.default.CREATED,
        data: project
    });
});
exports.getProjectById = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Id not provided!!");
    }
    const getProject = await (0, project_service_1.getProjectByIdService)(id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Found the target!",
        statusCode: http_status_codes_1.default.OK,
        data: getProject
    });
});
exports.updateProjectById = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Id not provided!!");
    }
    let uploadedFiles = [];
    if (Array.isArray(req.files)) {
        uploadedFiles = req.files.map(f => f.path);
    }
    else if (req.files && typeof req.files === "object") {
        uploadedFiles = Object.values(req.files).flat().map(f => f.path);
    }
    const updatedProject = await (0, project_service_1.updateProjectByIdService)(id, { ...req.body, image: uploadedFiles });
    (0, controller_util_1.responseFunction)(res, {
        message: "Updated the target!",
        statusCode: http_status_codes_1.default.OK,
        data: updatedProject
    });
});
exports.deleteProject = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Id not provided!!");
    }
    const deleteProject = await (0, project_service_1.deleteProjectService)(id);
    if (!deleteProject) {
        throw new App_error_1.AppError(http_status_codes_1.default.CONFLICT, "Unable to delete project!!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "PROJECT  deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deleteProject
    });
});
exports.getAllProjects = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    const projects = await (0, project_service_1.getAllProjectsService)(query);
    if (!projects) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Unable to get all projects!!");
    }
    if (projects.data?.length === 0) {
        (0, controller_util_1.responseFunction)(res, {
            message: "projects are empty!",
            statusCode: http_status_codes_1.default.NOT_FOUND,
            data: []
        });
        return;
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Get all projects",
        statusCode: http_status_codes_1.default.OK,
        data: projects
    });
});
