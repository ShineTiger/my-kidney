import prisma from "@/libs/server/prisma";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id를 찾을 수 없습니다" });
  } else {
    const post = await prisma.post.findUnique({
      where: { id: id.toString() },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });
    console.log(post);
    res.json(post);
  }
}

export default withHandler("GET", handler);
