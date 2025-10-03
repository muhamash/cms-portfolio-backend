"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../config/env.config");
const App_error_1 = require("../../config/errors/App.error");
const checkAuth = async (req, res, next) => {
    try {
        // console.log(req.cookies, envStrings.AUTH_SECRET)
        const token = req.cookies["accessToken"];
        // console.log(token,envStrings.AUTH_SECRET)
        if (!token) {
            throw new App_error_1.AppError(http_status_codes_1.default.UNAUTHORIZED, "No NextAuth session token found in cookies");
        }
        // Decode/verify the JWT from NextAuth
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.envStrings.ACCESS_TOKEN_SECRET);
        // console.log(decoded)
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new App_error_1.AppError(http_status_codes_1.default.UNAUTHORIZED, "Session expired"));
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new App_error_1.AppError(http_status_codes_1.default.UNAUTHORIZED, "Invalid session token"));
        }
        else if (error instanceof Error) {
            next(new App_error_1.AppError(http_status_codes_1.default.UNAUTHORIZED, error.message));
        }
        else {
            next(new App_error_1.AppError(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "Unknown authentication error"));
        }
    }
};
exports.checkAuth = checkAuth;
