import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "562511627877-v7u4ktdlep09qbddg6p5iibh09ne5uph.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  userinfo: {
    url: "https://my-zone-eight.vercel.app/api/auth/userinfo",
    params: { some: "param" },
  },
};

export default NextAuth(authOptions);
