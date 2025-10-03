import { Router } from "express";
import { multerUpload } from "../../../config/image/multer.config";
import { checkAuth } from "../../middleware/checkAuth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProjectById } from "./projects.controller";
import { createProjectSchema, updateProjectSchema } from "./projects.validation";


export const projectsRoutes = Router();


projectsRoutes.post( "/create-project", checkAuth, multerUpload.array("image"), validateRequest( createProjectSchema ), createProject );

projectsRoutes.get( "/get-project/:id", getProjectById );

projectsRoutes.patch( "/update-project/:id", checkAuth, multerUpload.array("image"), validateRequest(updateProjectSchema), updateProjectById );

projectsRoutes.delete( "/delete-project/:id", checkAuth, deleteProject );

projectsRoutes.get( "/all-projects", getAllProjects );