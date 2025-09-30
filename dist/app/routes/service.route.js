"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRouter = void 0;
const express_1 = require("express");
const blogs_route_1 = require("../module/blogs/blogs.route");
const projects_route_1 = require("../module/projects/projects.route");
exports.servicesRouter = (0, express_1.Router)();
const serviceRoute = [
    {
        path: "/blogs",
        route: blogs_route_1.blogsRoutes
    },
    {
        path: "/projects",
        route: projects_route_1.projectsRoutes
    }
];
serviceRoute.forEach(router => {
    exports.servicesRouter.use(router.path, router.route);
});
