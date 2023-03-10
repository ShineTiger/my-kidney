import client from "@/lib/client/client";
import withHandler from "@/lib/client/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const formData = req.body;
  const user = await client.user.upsert({
    where: { ...formData },
    create: { name: "annoymous", ...formData },
    update: {},
  });

  return res.status(200).end();
}

export default withHandler("POST", handler);
