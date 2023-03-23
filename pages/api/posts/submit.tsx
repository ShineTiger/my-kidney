import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  //res.json({ ok: true });
  res.status(200).end();
}

export default withHandler("POST", handler);
