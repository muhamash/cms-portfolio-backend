"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalInfoService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getPrisma_1 = require("../../../config/db/getPrisma");
const App_error_1 = require("../../../config/errors/App.error");
const personalInfoService = async (payload, image, userId) => {
    if (!image || !image[0])
        throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Image is required");
    const exist = await getPrisma_1.myPrisma.personalInfo.findUnique({ where: { userId } });
    if (exist) {
        throw new App_error_1.AppError(http_status_codes_1.default.CONFLICT, "Personal info already exists");
    }
    const createPersonalInfo = await getPrisma_1.myPrisma.personalInfo.create({
        data: {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            address: payload.address,
            title: payload.title,
            image: image[0],
            user: { connect: { id: userId } }
        }
    });
    if (!createPersonalInfo) {
        throw new App_error_1.AppError(http_status_codes_1.default.EXPECTATION_FAILED, "Unable to create personal info");
    }
    return createPersonalInfo;
};
exports.personalInfoService = personalInfoService;
