import client from "@/lib/client/client";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") res.status(401).end();
  console.log(req.body);
  res.json({ ok: true });
}
