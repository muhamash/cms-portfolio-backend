"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomepageService = exports.createHomepageService = exports.updateSkillService = exports.createSkillService = exports.updateSocialLinkService = exports.createSocialLinkService = exports.updatePersonalInfoService = exports.personalInfoService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const personalInfoService = async (payload, image, userId) => {
    if (!image || !image[0])
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Image is required");
    const exist = await getPrisma_1.myPrisma.personalInfo.findUnique({ where: { userId } });
    if (exist) {
        throw new App_error_1.AppError(http_status_codes_1.default.CONFLICT, "Personal info already exists");
    }
    const createPersonalInfo = await getPrisma_1.myPrisma.personalInfo.create({
        data: {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            address: payload.address,
            title: payload.title,
            image: image[0],
            user: { connect: { id: userId } }
        }
    });
    if (!createPersonalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to create personal info");
    }
    return createPersonalInfo;
};
exports.personalInfoService = personalInfoService;
const updatePersonalInfoService = async (payload, image, userId, id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const existingPersonalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existingPersonalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "existingPersonalInfo not found");
    }
    const updateProfileInfo = await getPrisma_1.myPrisma.personalInfo.update({
        where: {
            id: Number(id),
            userId: userId
        },
        data: {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            address: payload.address,
            title: payload.title,
            image: image[0],
            user: { connect: { id: userId } }
        }
    });
    if (!updateProfileInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to update personal info");
    }
    return updateProfileInfo;
};
exports.updatePersonalInfoService = updatePersonalInfoService;
const createSocialLinkService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId }
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const createLinks = await getPrisma_1.myPrisma.socialLink.create({
        data: {
            platform: payload.platform,
            url: payload.url,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    });
    if (!createLinks) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Failed to create social links");
    }
    return createLinks;
};
exports.createSocialLinkService = createSocialLinkService;
const updateSocialLinkService = async (payload, userId, id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const existing = await getPrisma_1.myPrisma.socialLink.findUnique({
        where: {
            id: numericId
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Social link not found");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId }
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const updatedLinks = await getPrisma_1.myPrisma.socialLink.update({
        where: {
            id: Number(id)
        },
        data: {
            platform: payload.platform,
            url: payload.url,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    });
    if (!updatedLinks) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Failed to create social updatedLinks");
    }
    return updatedLinks;
};
exports.updateSocialLinkService = updateSocialLinkService;
const createSkillService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: {
            id: Number(userId)
        }
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const createSkill = await getPrisma_1.myPrisma.skill.create({
        data: {
            name: payload.name.toLowerCase(),
            personalInfoId: personalInfo.id
        }
    });
    if (!createSkill) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Failed to create skill");
    }
    return createSkill;
};
exports.createSkillService = createSkillService;
const updateSkillService = async (payload, userId, id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const existing = await getPrisma_1.myPrisma.skill.findUnique({
        where: {
            id: numericId
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Skill not found");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: {
            id: numericId
        }
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const updateSkill = await getPrisma_1.myPrisma.skill.update({
        where: {
            id: Number(id)
        },
        data: {
            name: payload.name.toLowerCase(),
            personalInfoId: personalInfo.id
        }
    });
    if (!updateSkill) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Failed to updateSkill");
    }
    return updateSkill;
};
exports.updateSkillService = updateSkillService;
// home page
const createHomepageService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId }
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const createHomePage = await getPrisma_1.myPrisma.homePage.create({
        data: {
            headerText: payload.headerText,
            headerSubTitle: payload.headerSubTitle,
            headerAboutSubText: payload.headerAboutText,
            headerAboutAddress: payload.headerAboutSubTitle,
            headerAboutSubTitle: payload.headerAboutSubTitle,
            headerAboutText: payload.headerAboutText,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    });
    if (!createHomePage) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Can not create home page data");
    }
    return createHomePage;
};
exports.createHomepageService = createHomepageService;
const updateHomepageService = async (payload, userId, id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const existing = await getPrisma_1.myPrisma.homePage.findUnique({
        where: {
            id: numericId
        }
    });
    if (!existing) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Home page data not found!!");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId }
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const updateHomePage = await getPrisma_1.myPrisma.homePage.update({
        where: {
            id: numericId
        },
        data: {
            headerText: payload.headerText,
            headerSubTitle: payload.headerSubTitle,
            headerAboutSubText: payload.headerAboutText,
            headerAboutAddress: payload.headerAboutSubTitle,
            headerAboutSubTitle: payload.headerAboutSubTitle,
            headerAboutText: payload.headerAboutText,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    });
    if (!updateHomePage) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Can not updateHomePage  data");
    }
    return updateHomePage;
};
exports.updateHomepageService = updateHomepageService;
