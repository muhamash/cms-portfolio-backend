"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoute = void 0;
const http_status_codes_1 = require("http-status-codes");
const getPrisma_1 = require("../../../config/db/getPrisma");
const controller_util_1 = require("../../utils/controller.util");
exports.homeRoute = (0, controller_util_1.asyncHandler)(async (req, res, next) => {
    const users = await getPrisma_1.myPrisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    (0, controller_util_1.responseFunction)(res, {
        message: `This is the home route! Service is running!`,
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: users
    });
});
