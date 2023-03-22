import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

//서버와 연결되는지 확인
export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") res.status(401);
  res.status(200).end();
}
