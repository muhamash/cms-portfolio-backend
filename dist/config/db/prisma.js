"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrisma = getPrisma;
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const prisma_1 = require("../../generated/prisma");
function createPrisma() {
    return new prisma_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
}
function getPrisma() {
    if (process.env.NODE_ENV === 'production') {
        return createPrisma();
    }
    if (!global.prisma) {
        global.prisma = createPrisma();
    }
    return global.prisma;
}
