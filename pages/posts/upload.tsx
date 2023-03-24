import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface postType {
  title: string;
  content: string;
}

interface UploadPostMutation {
  post: Post;
}

const upload: NextPage = () => {
  const [submit, { loading, data }] =
    useMutation<UploadPostMutation>("/api/posts/submit");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<postType>({ mode: "onChange" });
  const onValid = (validForm: postType) => {
    if (loading) return;
    submit(validForm);
  };

  useEffect(() => {
    if (data) {
      router.replace(`/posts/${data.post.id}`);
    }
  });

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full max-w-lg my-0 mx-auto"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-m font-bold mb-2">
              제목
            </label>
            <input
              {...register("title", {
                required: "제목을 입력해주세요",
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
            />
            <span className="label-text-alt text-red-600">
              {errors.title ? errors.title.message : ""}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-m font-bold mb-2">
              내용
            </label>
            <textarea
              {...register("content", {
                required: "내용을 입력해주세요",
              })}
              className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="content"
            ></textarea>
            <span className="label-text-alt text-red-600">
              {errors.content ? errors.content.message : ""}
            </span>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              className="shadow bg-violet-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {loading ? "발행 중" : "발행하기"}
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </Layout>
  );
};

export default upload;
