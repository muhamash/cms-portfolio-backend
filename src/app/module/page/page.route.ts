import { Router } from "express";
import { multerUpload } from "../../../config/image/multer.config";
import { checkAuth } from "../../middleware/checkAuth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createEducation, createExperience, createHeaderSkill, createHeaderStat, createHomePageData, createPersonalInfo, createSkills, createSocialLinks, getHomePageData, getPersonalInfo, updatedPersonalInfo, updateEducation, updateExperience, updateHeaderSkill, updateHeaderStat, updateHomePageData, updateSkills, updateSocialLinks } from "./page.controller";
import { createEducationSchema, createExperienceSchema, headerSchema, headerSkillSchema, headerStats, personalInfoSchema, skillSchema, socialLinkSchema, updateEducationSchema, updateExperienceSchema, updateHeaderSchema, updateHeaderStats, updatePersonalInfo, updateSkillSchema, updateSocialSchema } from "./page.validation";


export const pageRoutes = Router();

// profile info 
pageRoutes.get("/get-personal-info", getPersonalInfo)

pageRoutes.post( "/create-personal-info", checkAuth, multerUpload.array( "image" ), validateRequest( personalInfoSchema ), createPersonalInfo );

pageRoutes.patch( "/update-personal-info/:id", checkAuth, multerUpload.array( "image" ), validateRequest( updatePersonalInfo ), updatedPersonalInfo );

// social links
pageRoutes.post( "/create-social-links", checkAuth, validateRequest(socialLinkSchema), createSocialLinks )

pageRoutes.patch( "/update-social-links/:id", checkAuth, validateRequest(updateSocialSchema), updateSocialLinks )

// skills
pageRoutes.post( "/create-skill", checkAuth, validateRequest(skillSchema), createSkills )

pageRoutes.patch( "/update-skill/:id", checkAuth, validateRequest(updateSkillSchema), updateSkills )

// home page
pageRoutes.get( "/get-home-page", getHomePageData)

pageRoutes.post( "/create-home-page", checkAuth, validateRequest(headerSchema), createHomePageData )

pageRoutes.patch( "/update-home-page/:id", checkAuth, validateRequest( updateHeaderSchema ), updateHomePageData )

// header skill
pageRoutes.post( "/create-header-skill", checkAuth, validateRequest(headerSkillSchema), createHeaderSkill )
pageRoutes.patch( "/update-header-skill/:id", checkAuth, validateRequest(headerSkillSchema), updateHeaderSkill )


// homepage Stat
pageRoutes.post( "/create-header-stats", checkAuth, validateRequest(headerStats), createHeaderStat )
pageRoutes.patch( "/update-header-stats/:id", checkAuth, validateRequest(updateHeaderStats), updateHeaderStat )

// experiences
pageRoutes.post( "/create-experience", checkAuth , validateRequest(createExperienceSchema), createExperience)
pageRoutes.patch( "/update-experience/:id", checkAuth, validateRequest(updateExperienceSchema), updateExperience )

// education
pageRoutes.post( "/create-education", checkAuth, validateRequest(createEducationSchema), createEducation )
pageRoutes.patch( "/update-education/:id", checkAuth, validateRequest(updateEducationSchema), updateEducation )