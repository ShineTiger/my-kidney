import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PostDetail() {
  const router = useRouter();
  const { data: session } = useSession();

  //todo : 삭제되었으면 null대신 리다이렉트
  const { data } = useSWR(
    router.query.id ? `/api/posts/${router.query.id}` : null,
    fetcher
  );

  const [isPostAuthor, setIsPostAuthor] = useState(false);

  async function deletePost() {
    alert("정말로 해당 포스트를 삭제하시겠습니까?");
    await fetch(`/api/posts/${router.query.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => alert(res.message));
    router.back();
  }

  if (!data) {
    return <div>Loading..</div>;
  }

  useEffect(() => {
    if (data && session) {
      setIsPostAuthor(data.user.name === session?.user?.name);
    } else {
      setIsPostAuthor(false);
    }
  }, [data, session]);

  return (
    <Layout>
      <p>{data.title}</p>
      {isPostAuthor && (
        <div>
          <button onClick={deletePost}>[삭제]</button>
        </div>
      )}
    </Layout>
  );
}

export default PostDetail;
