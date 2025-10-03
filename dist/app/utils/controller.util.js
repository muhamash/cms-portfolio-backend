"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFunction = exports.asyncHandler = void 0;
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => {
        // console.error( error );
        next(error);
    });
};
exports.asyncHandler = asyncHandler;
const responseFunction = (res, data) => {
    res.status(data.statusCode).json({
        message: data.message,
        statusCode: data.statusCode,
        meta: data.meta,
        data: data.data
    });
};
exports.responseFunction = responseFunction;
