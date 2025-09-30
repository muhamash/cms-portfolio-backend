import z from "zod";
import { createProjectSchema, updateProjectSchema } from "./projects.validation";


export type UpdateProjectTypes = z.infer<typeof updateProjectSchema>;
export type CreateProjectTypes = z.infer<typeof createProjectSchema>;