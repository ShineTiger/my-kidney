import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "@/libs/server/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:
        "562511627877-v7u4ktdlep09qbddg6p5iibh09ne5uph.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};

export default NextAuth(authOptions);
