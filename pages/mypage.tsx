import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import React from "react";

export default function mypage() {
  const { data } = useSession();

  return <Layout>{JSON.stringify(data, null, 2)}</Layout>;
}
