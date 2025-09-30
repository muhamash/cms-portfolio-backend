import { Router } from "express";
import { blogsRoutes } from "../module/blogs/blogs.route";
import { projectsRoutes } from "../module/projects/projects.route";


export const servicesRouter = Router()

const serviceRoute = [
    {
        path: "/blogs",
        route: blogsRoutes
    },
    {
        path: "/projects",
        route: projectsRoutes
    }
]

serviceRoute.forEach( router =>
{
    servicesRouter.use( router.path, router.route )
} );