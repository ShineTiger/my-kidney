import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { connect } from "http2";
import { NextApiRequest, NextApiResponse } from "next/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  if (!email) return res.status(400).json({ ok: false });

  //기존 유저인지 확인
  const existingUser = await client.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.json({ ok: true });
  }

  //기존 유저가 아닐경우
  const user = await client.user.create({
    data: { name: "Anonymous", email },
  });

  console.log(user);

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
