"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.deleteHomePageStat = exports.updateHeaderStat = exports.createHeaderStat = exports.deleteHeaderSkill = exports.updateHeaderSkill = exports.createHeaderSkill = exports.updateHomePageData = exports.createHomePageData = exports.getHomePageData = exports.deleteSkill = exports.updateSkills = exports.createSkills = exports.deleteSocialLinks = exports.updateSocialLinks = exports.createSocialLinks = exports.updatedPersonalInfo = exports.createPersonalInfo = exports.getPersonalInfo = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const controller_util_1 = require("../../utils/controller.util");
const page_service_1 = require("./page.service");
// profile info 
exports.getPersonalInfo = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findFirst({
        include: {
            socialLinks: true,
            skills: true,
            experiences: true,
            education: true,
            HomePage: true
        }
    });
    // console.log(personalInfo)
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found");
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
    // console.log( uploadedFiles, req.body, req.files )
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
    // console.log("payload", req.body)
    const socialLink = await (0, page_service_1.createSocialLinkService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Social links created",
        statusCode: http_status_codes_1.default.CREATED,
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
exports.deleteSocialLinks = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!Number(id)) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_ACCEPTABLE, "id must be numeric");
    }
    const existing = await getPrisma_1.myPrisma.socialLink.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "target not found!");
    }
    const deleteSocialLinks = await getPrisma_1.myPrisma.socialLink.delete({
        where: {
            id: Number(id)
        }
    });
    if (!deleteSocialLinks) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "unable to delete the target!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Social link deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deleteSocialLinks
    });
});
// skills
exports.createSkills = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const createSkill = await (0, page_service_1.createSkillService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "skill  created",
        statusCode: http_status_codes_1.default.CREATED,
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
exports.deleteSkill = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!Number(id)) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_ACCEPTABLE, "id must be numeric");
    }
    const existing = await getPrisma_1.myPrisma.skill.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "target not found!");
    }
    // console.log(existing)
    const deletedSkill = await getPrisma_1.myPrisma.skill.delete({
        where: {
            id: Number(id)
        }
    });
    if (!deletedSkill) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "unable to delete the target!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "skill link deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deletedSkill
    });
});
// home page
exports.getHomePageData = (0, controller_util_1.asyncHandler)(async (req, res) => {
    // console.log( "get home data" )
    const homePageData = await getPrisma_1.myPrisma.homePage.findFirst({
        include: {
            headerSkills: true,
            personalInfo: true,
            stats: true
        }
    });
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
// header skill
exports.createHeaderSkill = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const headerSkill = await (0, page_service_1.createHeaderSkillService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "created header skill",
        statusCode: http_status_codes_1.default.CREATED,
        data: headerSkill
    });
});
exports.updateHeaderSkill = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const headerSkill = await (0, page_service_1.updateHeaderSkillService)(req.body, user.id, id);
    (0, controller_util_1.responseFunction)(res, {
        message: "updated header skill",
        statusCode: http_status_codes_1.default.OK,
        data: headerSkill
    });
});
exports.deleteHeaderSkill = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!Number(id)) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_ACCEPTABLE, "id must be numeric");
    }
    const existing = await getPrisma_1.myPrisma.headerSkill.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "target not found!");
    }
    const deleteSkill = await getPrisma_1.myPrisma.headerSkill.delete({
        where: {
            id: Number(id)
        }
    });
    if (!deleteSkill) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "unable to delete the target!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "header skill deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deleteSkill
    });
});
// homepage stat
exports.createHeaderStat = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const newHeader = await (0, page_service_1.createHeaderStatService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "created header stats",
        statusCode: http_status_codes_1.default.CREATED,
        data: newHeader
    });
});
exports.updateHeaderStat = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const updateHeaderStat = await (0, page_service_1.updateHeaderStatService)(req.body, user.id, id);
    (0, controller_util_1.responseFunction)(res, {
        message: "header stat updated",
        statusCode: http_status_codes_1.default.OK,
        data: updateHeaderStat
    });
});
exports.deleteHomePageStat = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!Number(id)) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_ACCEPTABLE, "id must be numeric");
    }
    const existing = await getPrisma_1.myPrisma.homePageStat.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "target not found!");
    }
    const deleteHomePageStat = await getPrisma_1.myPrisma.homePageStat.delete({
        where: {
            id: Number(id)
        }
    });
    if (!deleteHomePageStat) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "unable to delete the target!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "Home page stat deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deleteHomePageStat
    });
});
//  Create Education
exports.createEducation = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const newEducation = await (0, page_service_1.createEducationService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Education created successfully",
        statusCode: http_status_codes_1.default.CREATED,
        data: newEducation,
    });
});
// Update Education
exports.updateEducation = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const updatedEducation = await (0, page_service_1.updateEducationService)(req.body, Number(id), user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Education updated successfully",
        statusCode: http_status_codes_1.default.OK,
        data: updatedEducation,
    });
});
exports.deleteEducation = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!Number(id)) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_ACCEPTABLE, "id must be numeric");
    }
    const existing = await getPrisma_1.myPrisma.education.findUnique({
        where: {
            id: Number(id)
        }
    });
    console.log(id, existing);
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "target not found!");
    }
    const deleteEducation = await getPrisma_1.myPrisma.education.delete({
        where: {
            id: Number(id)
        }
    });
    if (!deleteEducation) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "unable to delete the target!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "education deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deleteEducation
    });
});
// create experience
exports.createExperience = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const newExperience = await (0, page_service_1.createExperienceService)(req.body, user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Experience created successfully",
        statusCode: http_status_codes_1.default.CREATED,
        data: newExperience,
    });
});
// Update Experience
exports.updateExperience = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const updatedExperience = await (0, page_service_1.updateExperienceService)(req.body, Number(id), user.id);
    (0, controller_util_1.responseFunction)(res, {
        message: "Experience updated successfully",
        statusCode: http_status_codes_1.default.OK,
        data: updatedExperience,
    });
});
exports.deleteExperience = (0, controller_util_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!Number(id)) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_ACCEPTABLE, "id must be numeric");
    }
    const existing = await getPrisma_1.myPrisma.workExperience.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "target not found!");
    }
    const deleteExperience = await getPrisma_1.myPrisma.workExperience.delete({
        where: {
            id: Number(id)
        }
    });
    if (!deleteExperience) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "unable to delete the target!");
    }
    (0, controller_util_1.responseFunction)(res, {
        message: "workExperience deleted",
        statusCode: http_status_codes_1.default.OK,
        data: deleteExperience
    });
});
