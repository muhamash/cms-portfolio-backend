import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProjectById } from "./projects.controller";
import { createProjectSchema, updateProjectSchema } from "./projects.validation";


export const projectsRoutes = Router();


projectsRoutes.post( "/create-project", validateRequest( createProjectSchema ), createProject );

projectsRoutes.get( "/get-project/:id", getProjectById );

projectsRoutes.patch( "/update-project/:id", validateRequest(updateProjectSchema), updateProjectById );

projectsRoutes.delete( "/delete-project/:id", deleteProject );

projectsRoutes.get( "/all-projects", getAllProjects );