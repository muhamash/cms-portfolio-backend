import { Router } from "express";
import { blogsRoutes } from "../module/blogs/blogs.route";



export const servicesRouter = Router()

const serviceRoute = [
    {
        path: "/blogs",
        route: blogsRoutes
    }
]

serviceRoute.forEach( router =>
{
    servicesRouter.use( router.path, router.route )
} );