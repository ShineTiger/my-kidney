import prisma from "@/libs/server/prisma";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id를 찾을 수 없습니다" });
  } else {
    if (req.method === "DELETE") {
      await prisma.post.delete({ where: { id: id.toString() } });
      res.status(200).json({ message: "포스트가 삭제되었습니다" });
    }
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

export default withHandler(["GET", "DELETE"], handler);
