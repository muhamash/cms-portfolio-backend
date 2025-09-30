import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createProject, getProjectById } from "./projects.controller";
import { createProjectSchema } from "./projects.validation";


export const projectsRoutes = Router();


projectsRoutes.post( "/create-project", validateRequest( createProjectSchema ), createProject );

projectsRoutes.get( "/get-project/:id", getProjectById );