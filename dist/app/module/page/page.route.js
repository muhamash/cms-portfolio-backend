"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRoutes = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../../config/image/multer.config");
const checkAuth_middleware_1 = require("../../middleware/checkAuth.middleware");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const page_controller_1 = require("./page.controller");
const page_validation_1 = require("./page.validation");
exports.pageRoutes = (0, express_1.Router)();
// profile info 
exports.pageRoutes.get("/get-personal-info", page_controller_1.getPersonalInfo);
exports.pageRoutes.post("/create-personal-info", checkAuth_middleware_1.checkAuth, multer_config_1.multerUpload.array("image"), (0, validateRequest_middleware_1.validateRequest)(page_validation_1.personalInfoSchema), page_controller_1.createPersonalInfo);
exports.pageRoutes.patch("/update-personal-info/:id", checkAuth_middleware_1.checkAuth, multer_config_1.multerUpload.array("image"), (0, validateRequest_middleware_1.validateRequest)(page_validation_1.updatePersonalInfo), page_controller_1.updatedPersonalInfo);
// social links
exports.pageRoutes.post("/create-social-links", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.socialLinkSchema), page_controller_1.createSocialLinks);
exports.pageRoutes.patch("/update-social-links/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.updateSocialSchema), page_controller_1.updateSocialLinks);
exports.pageRoutes.delete("/delete-social-links/:id", checkAuth_middleware_1.checkAuth, page_controller_1.deleteSocialLinks);
// skills
exports.pageRoutes.post("/create-skill", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.skillSchema), page_controller_1.createSkills);
exports.pageRoutes.patch("/update-skill/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.skillSchema), page_controller_1.updateSkills);
exports.pageRoutes.delete("/delete-skill/:id", checkAuth_middleware_1.checkAuth, page_controller_1.deleteSkill);
// home page
exports.pageRoutes.get("/get-home-page", page_controller_1.getHomePageData);
exports.pageRoutes.post("/create-home-page", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.headerSchema), page_controller_1.createHomePageData);
exports.pageRoutes.patch("/update-home-page/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.updateHeaderSchema), page_controller_1.updateHomePageData);
// header skill
exports.pageRoutes.post("/create-header-skill", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.headerSkillSchema), page_controller_1.createHeaderSkill);
exports.pageRoutes.patch("/update-header-skill/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.headerSkillSchema), page_controller_1.updateHeaderSkill);
exports.pageRoutes.delete("/delete-header-skill/:id", checkAuth_middleware_1.checkAuth, page_controller_1.deleteHeaderSkill);
// homepage Stat
exports.pageRoutes.post("/create-header-stats", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.headerStats), page_controller_1.createHeaderStat);
exports.pageRoutes.patch("/update-header-stats/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.updateHeaderStats), page_controller_1.updateHeaderStat);
exports.pageRoutes.delete("/delete-header-stats/:id", checkAuth_middleware_1.checkAuth, page_controller_1.deleteHomePageStat);
// experiences
exports.pageRoutes.post("/create-experience", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.createExperienceSchema), page_controller_1.createExperience);
exports.pageRoutes.patch("/update-experience/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.updateExperienceSchema), page_controller_1.updateExperience);
exports.pageRoutes.delete("/delete-experience/:id", checkAuth_middleware_1.checkAuth, page_controller_1.deleteExperience);
// education
exports.pageRoutes.post("/create-education", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.createEducationSchema), page_controller_1.createEducation);
exports.pageRoutes.patch("/update-education/:id", checkAuth_middleware_1.checkAuth, (0, validateRequest_middleware_1.validateRequest)(page_validation_1.updateEducationSchema), page_controller_1.updateEducation);
exports.pageRoutes.delete("/delete-education/:id", checkAuth_middleware_1.checkAuth, page_controller_1.deleteEducation);
