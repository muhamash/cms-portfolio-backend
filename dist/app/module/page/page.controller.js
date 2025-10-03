"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomePageData = exports.createHomePageData = exports.getHomePageData = exports.updateSkills = exports.createSkills = exports.updateSocialLinks = exports.createSocialLinks = exports.updatedPersonalInfo = exports.createPersonalInfo = exports.getPersonalInfo = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const controller_util_1 = require("../../utils/controller.util");
const page_service_1 = require("./page.service");
// profile info 
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
// social links
exports.createSocialLinks = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const socialLink = await (0, page_service_1.createSocialLinkService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Social links created",
        statusCode: http_status_codes_1.default.OK,
        data: socialLink
    });
});
exports.updateSocialLinks = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const socialLink = await (0, page_service_1.updateSocialLinkService)(req.body, user.id, id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Social links updated",
        statusCode: http_status_codes_1.default.OK,
        data: socialLink
    });
});
// skills
exports.createSkills = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const createSkill = await (0, page_service_1.createSkillService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "skill  created",
        statusCode: http_status_codes_1.default.OK,
        data: createSkill
    });
});
exports.updateSkills = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const updateSkill = await (0, page_service_1.updateSkillService)(req.body, user.id, id);
    (0, controller_util_1.responseFunction)(res, {
        message: "skill  updated",
        statusCode: http_status_codes_1.default.OK,
        data: updateSkill
    });
});
// home page
exports.getHomePageData = (0, controller_util_1.asyncHandler)(async (req, res) => {
    console.log("get home data");
    const homePageData = await getPrisma_1.myPrisma.homePage.findFirst();
    if (!homePageData) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Home page data not found");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Home page data",
        statusCode: http_status_codes_1.default.OK,
        data: homePageData
    });
});
exports.createHomePageData = (0, controller_util_1.asyncHandler)(async (req, res) => {
    console.log("create home data");
    const user = req.user;
    const homePage = await (0, page_service_1.createHomepageService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Home page data created",
        statusCode: http_status_codes_1.default.CREATED,
        data: homePage
    });
});
exports.updateHomePageData = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const updateHome = await (0, page_service_1.updateHomepageService)(req.body, user.id, id);
    (0, controller_util_1.responseFunction)(res, {
        message: "updated home page data",
        statusCode: http_status_codes_1.default.OK,
        data: updateHome
    });
});
