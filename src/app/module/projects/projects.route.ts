import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProjectById } from "./projects.controller";
import { createProjectSchema, updateProjectSchema } from "./projects.validation";
import { multerUpload } from "../../../config/image/multer.config";


export const projectsRoutes = Router();


projectsRoutes.post( "/create-project", multerUpload.array("image"), validateRequest( createProjectSchema ), createProject );

projectsRoutes.get( "/get-project/:id", getProjectById );

projectsRoutes.patch( "/update-project/:id", multerUpload.array("image"), validateRequest(updateProjectSchema), updateProjectById );

projectsRoutes.delete( "/delete-project/:id", deleteProject );

projectsRoutes.get( "/all-projects", getAllProjects );