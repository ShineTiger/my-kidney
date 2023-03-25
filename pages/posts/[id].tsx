import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PostDetail() {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id ? `/api/posts/${router.query.id}` : null,
    fetcher
  );
  console.log(data);
  if (!data) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <p>{data.title}</p>
    </div>
  );
}

export default PostDetail;
