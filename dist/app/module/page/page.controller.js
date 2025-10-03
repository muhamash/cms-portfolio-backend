"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedPersonalInfo = exports.createPersonalInfo = exports.getPersonalInfo = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const controller_util_1 = require("../../utils/controller.util");
const page_service_1 = require("./page.service");
exports.getPersonalInfo = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findFirst();
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info found");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Got personal info",
        statusCode: http_status_codes_1.default.OK,
        data: personalInfo
    });
});
exports.createPersonalInfo = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    let uploadedFiles = [];
    if (Array.isArray(req.files)) {
        uploadedFiles = req.files.map(f => f.path);
    }
    else if (req.files && typeof req.files === "object") {
        uploadedFiles = Object.values(req.files).flat().map(f => f.path);
    }
    const createPersonalInfo = await (0, page_service_1.personalInfoService)(req.body, uploadedFiles, user.id);
    if (!createPersonalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to create personal info!!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Created personal info",
        statusCode: http_status_codes_1.default.CREATED,
        data: createPersonalInfo
    });
});
exports.updatedPersonalInfo = (0, controller_util_1.asyncHandler)(async (req, res) => {
    console.log("update personal info");
    const user = req.user;
    const id = req.params.id;
    let uploadedFiles = [];
    if (Array.isArray(req.files)) {
        uploadedFiles = req.files.map(f => f.path);
    }
    else if (req.files && typeof req.files === "object") {
        uploadedFiles = Object.values(req.files).flat().map(f => f.path);
    }
    const updateProfile = await (0, page_service_1.updatePersonalInfoService)(req.body, uploadedFiles, user.id, id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Profile info updated",
        statusCode: http_status_codes_1.default.OK,
        data: updateProfile
    });
});
