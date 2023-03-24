import prisma from "@/libs/server/prisma";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const {
    body: { title, content },
  } = req;

  if (session) {
    const userEmail = session.user?.email;
    if (userEmail) {
      //세션에 있는 이메일 주소로 데이터베이스에 있는 User를 찾는다
      const existingUser = await prisma.user.findUnique({
        where: { email: userEmail },
      });
      if (existingUser) {
        const post = await prisma.post.create({
          data: { title, content, user: { connect: { id: existingUser.id } } },
        });
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "유저를 찾을 수 없습니다" });
      }
    } else {
      res.status(400).json({ message: "세션에서 이메일을 찾을 수 없습니다" });
    }
  } else {
    res.status(401).json({ message: "인증되지 않은 유저입니다" });
  }
}

export default withHandler("POST", handler);
