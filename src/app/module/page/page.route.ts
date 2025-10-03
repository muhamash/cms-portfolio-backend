import { Router } from "express";
import { multerUpload } from "../../../config/image/multer.config";
import { checkAuth } from "../../middleware/checkAuth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createPersonalInfo, getPersonalInfo, updatedPersonalInfo } from "./page.controller";
import { personalInfoSchema, updatePersonalInfo } from "./page.validation";


export const pageRoutes = Router();

pageRoutes.get("/get-personal-info", getPersonalInfo)

pageRoutes.post( "/create-personal-info", checkAuth, multerUpload.array( "image" ), validateRequest( personalInfoSchema ), createPersonalInfo );

// task
pageRoutes.patch( "/update-personal-info", checkAuth, multerUpload.array("image"), validateRequest(updatePersonalInfo),  updatedPersonalInfo);