import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  let user;
  if (email) {
    user = await client.user.findUnique({ where: { email } });
    if (!user) {
      console.log("찾을 수 없으니 생성합니다.");
      user = await client.user.create({ data: { name: "Annonymous", email } });
    }
    console.log(user);
  }

  return res.status(200).end();
}

export default withHandler("POST", handler);
