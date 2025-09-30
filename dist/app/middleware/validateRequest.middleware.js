"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const App_error_1 = require("../../config/errors/App.error");
const validateRequest = (zodSchema) => async (req, res, next) => {
    try {
        if (!req.body) {
            throw new App_error_1.AppError(http_status_codes_1.default.CONFLICT, "Request body is absent!!!");
        }
        // console.log(req.body);
        req.body = await zodSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateRequest = validateRequest;
