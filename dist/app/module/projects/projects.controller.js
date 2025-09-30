"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.createProject = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const App_error_1 = require("../../../config/errors/App.error");
const controller_util_1 = require("../../utils/controller.util");
const project_service_1 = require("./project.service");
exports.createProject = (0, controller_util_1.asyncHandler)(async (req, res) => {
    // console.log(req.body)
    const project = await (0, project_service_1.createProjectService)(req.body);
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
