import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../auth/[...nextauth]";

export default async function nextSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  res.send(JSON.stringify(session, null, 2));
}
