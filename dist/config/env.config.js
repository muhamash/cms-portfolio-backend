"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envStrings = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.envStrings = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    // NODE_ENV: process.env.NODE_ENV as "development" | "production",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    BCRYPT_SALT: process.env.BCRYPT_SALT,
};
