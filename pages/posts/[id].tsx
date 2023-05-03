import Layout from "@/components/Layout";
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
    router.query.id ? `/api/posts/${router.query.id}` : "",
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

  const editPost = () => {
    router.push(`/posts/edit?id=${router.query.id}`);
  };

  if (!data) {
    return <div>Loading..</div>;
  }
  return (
    <Layout>
      <h3 className="text-3xl mt-5">{data.post?.title}</h3>
      <p className="mt-12">{data.post?.content}</p>
      {session && data.post?.user.name === session?.user?.name && (
        <div className="mt-6">
          <button
            className="py-2 px-3 mr-3 rounded-md bg-violet-600 text-gray-50"
            onClick={editPost}
          >
            수정
          </button>
          <button
            className="py-2 px-3 rounded-md border-2 border-solid"
            onClick={deletePost}
          >
            삭제
          </button>
        </div>
      )}
    </Layout>
  );
}

export default PostDetail;
