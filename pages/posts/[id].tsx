import Layout from "@/components/layout";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface GetPostType {
  post:
    | (Post & {
        user: {
          id: string;
          name: string | null;
          image: string | null;
        };
      })
    | null;
  user:
    | {
        id: string;
        name: string | null;
        image: string | null;
      }
    | undefined;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PostDetail() {
  const router = useRouter();
  const { data: session } = useSession();

  //todo : 삭제되었으면 null대신 리다이렉트
  const { data } = useSWR<GetPostType>(
    router.query.id ? `/api/posts/${router.query.id}` : null,
    fetcher
  );

  async function deletePost() {
    alert("정말로 해당 포스트를 삭제하시겠습니까?");
    await fetch(`/api/posts/${router.query.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => alert(res.message));
    router.back();
  }

  const isPostAuthor = session && data?.user?.name === session?.user?.name;

  if (!data) {
    return <div>Loading..</div>;
  }

  return (
    <Layout>
      <p>{data.post?.title}</p>
      {isPostAuthor && (
        <div>
          <button onClick={deletePost}>[삭제]</button>
        </div>
      )}
    </Layout>
  );
}

export default PostDetail;
