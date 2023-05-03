import Layout from "@/components/layout";
import PostCards from "@/components/PostCards";
import { Post } from "@prisma/client";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data } = useSWR<Post[]>("/api/posts", fetcher);

  return (
    <Layout>
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => (
          <PostCards
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            key={post.id}
          />
        ))}
      </div>
    </Layout>
  );
};
export default Home;
