import Layout from "@/components/layout";
import PostForm from "@/components/PostForm";
import useMutation from "@/libs/client/useMutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface PostType {
  title: string;
  content: string;
}

interface UploadPostMutation {
  post: Post;
}

const upload: NextPage = () => {
  const [submit, { loading, data }] =
    useMutation<UploadPostMutation>("/api/posts/submit");
  const methods = useForm();

  useEffect(() => {
    if (data) {
      console.log(data.post.id);
      router.replace(`/posts/${data.post.id}`);
    }
  }, [data, router]);

  const onValid = (validForm: PostType) => {
    if (loading) return;
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <PostForm loading={loading} data={data} methods={methods} />
      </FormProvider>
    </Layout>
  );
};

export default upload;
