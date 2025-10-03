import { Router } from "express";
import { multerUpload } from "../../../config/image/multer.config";
import { checkAuth } from "../../middleware/checkAuth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createHomePageData, createPersonalInfo, createSkills, createSocialLinks, getHomePageData, getPersonalInfo, updatedPersonalInfo, updateHomePageData, updateSkills, updateSocialLinks } from "./page.controller";
import { headerSchema, personalInfoSchema, skillSchema, socialLinkSchema, updateHeaderSchema, updatePersonalInfo, updateSkillSchema, updateSocialSchema } from "./page.validation";


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

pageRoutes.patch( "/update-home-page/:id", checkAuth, validateRequest(updateHeaderSchema), updateHomePageData )