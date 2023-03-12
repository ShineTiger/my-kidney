import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { connect } from "http2";
import { NextApiRequest, NextApiResponse } from "next/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const address = phone ? { phone: +phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const user = await client.user.upsert({
    where: {
      ...address,
    },
    create: {
      name: "Anonymous",
      ...address,
    },
    update: {},
  });
  //user를 upsert하고 token을 생성한 다음에 upsert 했던 user와 연결한다
  const token = await client.token.create({
    data: { payload: payload, user: { connect: { id: user.id } } },
  });
  console.log(token);
  // if (email) {
  //   user = await client.user.findUnique({ where: { email } });
  //   if (!user) {
  //     console.log("찾을 수 없으니 생성합니다.");
  //     user = await client.user.create({ data: { name: "Annonymous", email } });
  //   }
  //   console.log(user);
  // }

  return res.status(200).end();
}

export default withHandler("POST", handler);
