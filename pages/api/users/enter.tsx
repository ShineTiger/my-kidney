import client from "@/lib/client/client";
import withHandler from "@/lib/client/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.json({ ok: true });
}

export default withHandler("POST", handler);
