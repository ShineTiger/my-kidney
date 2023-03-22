import Layout from "@/components/layout";
import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface postType {
  title: string;
  content: string;
}

const upload: NextPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<postType>({ mode: "onChange" });
  const [submitting, setSubmitting] = useState(false);
  const onValid = (validForm: postType) => {
    setSubmitting(true);
    fetch("/api/posts/submit", {
      method: "POST",
      body: JSON.stringify(validForm),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setSubmitting(false);
    });
  };
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
              발행
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </Layout>
  );
};

export default upload;
