import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '../../generated/prisma';

declare global {
  var prisma: ReturnType<typeof createPrisma> | undefined;
}

function createPrisma() {
  return new PrismaClient().$extends(withAccelerate());
}

export function getPrisma() {
  if (process.env.NODE_ENV === 'production') {
    return createPrisma();
  }

  if (!global.prisma) {
    global.prisma = createPrisma();
  }
  return global.prisma;
}