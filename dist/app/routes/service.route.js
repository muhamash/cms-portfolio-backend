"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRouter = void 0;
const express_1 = require("express");
const blogs_routes_1 = require("../module/blogs/blogs.routes");
exports.servicesRouter = (0, express_1.Router)();
const serviceRoute = [
    {
        path: "/blogs",
        route: blogs_routes_1.blogsRoutes
    }
];
serviceRoute.forEach(router => {
    exports.servicesRouter.use(router.path, router.route);
});
