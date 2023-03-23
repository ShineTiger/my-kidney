import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const prisma = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = prisma;

export default prisma;
