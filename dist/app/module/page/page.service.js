"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExperienceService = exports.createExperienceService = exports.updateEducationService = exports.createEducationService = exports.updateHeaderStatService = exports.createHeaderStatService = exports.updateHeaderSkillService = exports.createHeaderSkillService = exports.updateHomepageService = exports.createHomepageService = exports.updateSkillService = exports.createSkillService = exports.updateSocialLinkService = exports.createSocialLinkService = exports.updatePersonalInfoService = exports.personalInfoService = void 0;
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
            id: Number(id),
            userId: userId
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
    console.log(userId);
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: {
            id: Number(userId)
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
// header skill
const createHeaderSkillService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
        include: { HomePage: true },
    });
    if (!personalInfo || !personalInfo.HomePage) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Homepage not found for this user");
    }
    const newSkill = await getPrisma_1.myPrisma.headerSkill.create({
        data: {
            skill: payload.skill,
            homePage: {
                connect: { id: Number(personalInfo.HomePage.id) }
            }
        },
    });
    if (!newSkill) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Failed to create new skill");
    }
    return newSkill;
};
exports.createHeaderSkillService = createHeaderSkillService;
const updateHeaderSkillService = async (payload, userId, id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
        include: { HomePage: true },
    });
    if (!personalInfo || !personalInfo.HomePage) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Homepage not found for this user");
    }
    const skillExists = await getPrisma_1.myPrisma.headerSkill.findUnique({
        where: { id: numericId },
    });
    if (!skillExists) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Header skill not found");
    }
    const updatedSkill = await getPrisma_1.myPrisma.headerSkill.update({
        where: { id: numericId },
        data: {
            skill: payload.skill ?? skillExists.skill,
            homePage: {
                connect: { id: Number(personalInfo.HomePage.id) }
            }
        },
    });
    if (!updatedSkill) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Failed to update expectation failed");
    }
    return updatedSkill;
};
exports.updateHeaderSkillService = updateHeaderSkillService;
// homepage sats
const createHeaderStatService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
        include: { HomePage: true },
    });
    if (!personalInfo || !personalInfo.HomePage) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Homepage not found for this user");
    }
    const newHomepageStat = await getPrisma_1.myPrisma.homePageStat.create({
        data: {
            label: payload.label,
            value: payload.value,
            homePage: { connect: { id: Number(personalInfo.HomePage.id) } }
        },
    });
    if (!newHomepageStat) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable create homepage stat");
    }
    return newHomepageStat;
};
exports.createHeaderStatService = createHeaderStatService;
// Update HomePageStat
const updateHeaderStatService = async (payload, userId, id) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, " ID must be a valid number.");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
        include: { HomePage: true },
    });
    if (!personalInfo || !personalInfo.HomePage) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Homepage not found for this user");
    }
    const stat = await getPrisma_1.myPrisma.homePageStat.findUnique({ where: { id: numericId } });
    if (!stat) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Header stat not found");
    }
    const updateHomeStat = await getPrisma_1.myPrisma.homePageStat.update({
        where: { id: numericId },
        data: {
            label: payload.label ?? stat.label,
            value: payload.value ?? stat.value,
            homePage: { connect: { id: Number(personalInfo.HomePage.id) } }
        },
    });
    if (!updateHomeStat) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to update homepage stat");
    }
    return updateHomeStat;
};
exports.updateHeaderStatService = updateHeaderStatService;
// Create Education
const createEducationService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const newEducation = await getPrisma_1.myPrisma.education.create({
        data: {
            degree: payload.degree,
            institute: payload.institute,
            timeLine: payload.timeLine,
            description: payload.description,
            personalInfo: { connect: { id: Number(personalInfo.id) } }
        },
    });
    if (!newEducation) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to create education");
    }
    return newEducation;
};
exports.createEducationService = createEducationService;
// Update Education
const updateEducationService = async (payload, id, userId) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "ID must be a valid number.");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const existingEducation = await getPrisma_1.myPrisma.education.findUnique({
        where: { id: numericId },
    });
    if (!existingEducation) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Education record not found");
    }
    const updatedEducation = await getPrisma_1.myPrisma.education.update({
        where: { id: numericId },
        data: {
            degree: payload.degree ?? existingEducation.degree,
            institute: payload.institute ?? existingEducation.institute,
            timeLine: payload.timeLine ?? existingEducation.timeLine,
            description: payload.description ?? existingEducation.description,
            personalInfo: { connect: { id: Number(personalInfo.id) } }
        },
    });
    if (!updatedEducation) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to update education");
    }
    return updatedEducation;
};
exports.updateEducationService = updateEducationService;
// Create Work Experience
const createExperienceService = async (payload, userId) => {
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const newExperience = await getPrisma_1.myPrisma.workExperience.create({
        data: {
            position: payload.position,
            company: payload.company,
            timeLine: payload.timeLine,
            description: payload.description,
            personalInfo: {
                connect: {
                    id: Number(personalInfo.id),
                }
            }
        },
    });
    if (!newExperience) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to create experience");
    }
    return newExperience;
};
exports.createExperienceService = createExperienceService;
// Update Work Experience
const updateExperienceService = async (payload, id, userId) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "ID must be a valid number.");
    }
    const personalInfo = await getPrisma_1.myPrisma.personalInfo.findUnique({
        where: { userId },
    });
    if (!personalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Personal info not found for this user");
    }
    const existingExperience = await getPrisma_1.myPrisma.workExperience.findUnique({
        where: { id: numericId },
    });
    if (!existingExperience) {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "Experience record not found");
    }
    const updatedExperience = await getPrisma_1.myPrisma.workExperience.update({
        where: { id: numericId },
        data: {
            position: payload.position ?? existingExperience.position,
            company: payload.company ?? existingExperience.company,
            timeLine: payload.timeLine ?? existingExperience.timeLine,
            description: payload.description ?? existingExperience.description,
            personalInfo: {
                connect: {
                    id: Number(personalInfo.id),
                }
            }
        },
    });
    if (!updatedExperience) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to update experience");
    }
    return updatedExperience;
};
exports.updateExperienceService = updateExperienceService;
