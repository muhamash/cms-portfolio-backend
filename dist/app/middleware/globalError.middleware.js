"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const App_error_1 = require("../../config/errors/App.error");
const prisma_1 = require("../../generated/prisma");
const util_middleware_1 = require("../utils/util.middleware");
const globalErrorResponse = (error, req, res, next) => {
    let statusCode = http_status_codes_1.default.BAD_REQUEST;
    let message = "Something went wrong";
    let stack;
    // Handle Zod errors
    if ((0, util_middleware_1.isZodError)(error)) {
        const zodError = error;
        const fieldIssues = (0, util_middleware_1.parseZodError)(zodError);
        let customIssues = [];
        try {
            customIssues = JSON.parse(zodError.message) || [];
        }
        catch (e) {
            customIssues = [];
        }
        // Get the first available field name from either path or field
        const fieldName = customIssues[0]?.path?.[0] ??
            fieldIssues[0]?.field ??
            'unknown_field';
        // Get the first available error message
        const errorMessage = fieldIssues[0]?.message ??
            customIssues[0]?.message ??
            "Validation error";
        message = `Validation error on field '${fieldName}': ${errorMessage}`;
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            name: zodError.name || "ZodError",
            message,
            status: http_status_codes_1.default.BAD_REQUEST,
            success: false,
            errors: customIssues.length ? customIssues : fieldIssues,
            ...(process.env.NODE_ENV === "development" && { stack: zodError.stack }),
        });
    }
    // Handle Prisma unique constraint error
    else if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002") {
        const targetField = error.meta?.target?.join(", ") || "field";
        statusCode = http_status_codes_1.default.CONFLICT;
        message = `Duplicate value for unique field(s): ${targetField}`;
    }
    // Handle custom AppError
    else if (error instanceof App_error_1.AppError) {
        statusCode = error.statusCode;
        message = error.message;
        stack = error.stack;
    }
    // Handle general Error objects
    else if (error instanceof Error) {
        const customError = error;
        message = error.message;
        stack = error.stack;
        statusCode = customError.statusCode || http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    }
    // Fallback for unknown errors
    else {
        message = "An unexpected error occurred.";
        statusCode = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    }
    console.error(error);
    // Build response
    const responsePayload = {
        name: error.name || "Error",
        message,
        status: statusCode,
        success: false,
    };
    if (process.env.NODE_ENV === "development") {
        if (stack) {
            responsePayload.stack = stack;
        }
        else if (error.stack) {
            responsePayload.stack = error.stack;
        }
    }
    return res.status(statusCode).json(responsePayload);
};
exports.globalErrorResponse = globalErrorResponse;
