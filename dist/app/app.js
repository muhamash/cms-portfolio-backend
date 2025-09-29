"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalError_middleware_1 = require("./middleware/globalError.middleware");
const globalNotfound_middleware_1 = require("./middleware/globalNotfound.middleware");
const home_route_1 = require("./module/home/home.route");
const service_route_1 = require("./routes/service.route");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    // credentials: true
}));
app.use("/", home_route_1.homeRouter);
app.use("/v1", service_route_1.servicesRouter);
app.use(globalNotfound_middleware_1.globalNotFoundResponse);
app.use(globalError_middleware_1.globalErrorResponse);
exports.default = app;
