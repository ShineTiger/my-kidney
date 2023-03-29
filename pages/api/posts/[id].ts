import prisma from "@/libs/server/prisma";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { title, content } = req.body;

  if (!id) {
    return res.status(400).json({ error: "id를 찾을 수 없습니다" });
  } else {
    if (req.method === "GET") {
      const post = await prisma.post.findUnique({
        where: { id: id.toString() },
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      });
      return res.json({ post });
    }

    const session = await getServerSession(req, res, authOptions);
    if (session) {
      if (req.method === "DELETE") {
        await prisma.post.delete({ where: { id: id.toString() } });
        return res.status(200).json({ message: "포스트가 삭제되었습니다" });
      }
      if (req.method === "POST") {
        const userEmail = session.user?.email;
        const existingPost = await prisma.post.findUnique({
          where: { id: id.toString() },
          include: {
            user: {
              select: { email: true },
            },
          },
        });

        if (userEmail === existingPost?.user.email) {
          await prisma.post.update({
            where: { id: id.toString() },
            data: { title, content },
          });
          res.status(200).json(id);
        }
      }
    } else {
      return res.status(400).json({ error: "유효하나 세션이 없습니다" });
    }
  }
}

export default withHandler(["GET", "DELETE", "POST"], handler);
