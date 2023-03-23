import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import NextAuth from "next-auth";
interface signupFormType {
  email: string;
  name: string;
}

export default function signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signupFormType>({ mode: "onChange" });
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const [submit, { loading, data, error }] = useMutation("/api/posts/submit");

  const onValid = (validForm: signupFormType) => {
    if (loading) return;
    submit(validForm);
  };

  return (
    <Layout>
      <section className="p-6 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
        <form
          onSubmit={handleSubmit(onValid)}
          className="container flex flex-col mx-auto space-y-10 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50 dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">회원 가입</p>
              <p className="text-xs">가입에 필요한 정보를 적어주세요</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                      value: emailRegex,
                      message: "이메일 양식이 올바르지 않습니다",
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="이메일을 적어주세요"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 p-1 focus:ring-violet-600 border-gray-300 text-gray-900 dark:text-white"
                />
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.email?.message}
                  </span>
                </label>
              </div>
              <div className="col-span-full">
                <label htmlFor="firstname" className="text-sm">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: "이름을 입력해주세요",
                    maxLength: {
                      value: 10,
                      message: "10자 이내로 입력해 주세요",
                    },
                  })}
                  id="name"
                  type="text"
                  placeholder="10자 이내로 이름을 적어주세요"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 p-1 focus:ring-violet-600 border-gray-300 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-violet-600 w-full px-8 py-3 font-semibold rounded-md  text-gray-50"
          >
            {loading ? "로딩 중" : "이메일 인증하기"}
          </button>
        </form>
      </section>
    </Layout>
  );
}
