import Layout from "@/components/layout";
import useMutation from "@/lib/client/useMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import NextAuth from "next-auth";

interface signupFormType {
  email: string;
  username: string;
  password: string;
  pwConfirm: string;
}

export default function signup() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<signupFormType>({ mode: "onChange" });
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const [submitting, setSubmitting] = useState(false);
  const [enter, { loading, data, error }] = useMutation("/api/users/enter");
  const onValid = (validForm: signupFormType) => {
    enter(validForm);
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
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 text-gray-900"
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
                  id="name"
                  type="text"
                  placeholder="10자 이내로 이름을 적어주세요"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 text-gray-900"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="website" className="text-sm">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "최소 8자 이상 입력해 주세요",
                    },
                    pattern: {
                      value: pwRegex,
                      message:
                        "비밀번호는 8자 이내의 영문, 숫자 및 특수 문자만 이용할 수 있습니다",
                    },
                  })}
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요 "
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 text-gray-900"
                />
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.password?.message}
                  </span>
                </label>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="website" className="text-sm">
                  Password Confirm
                </label>
                <input
                  {...register("pwConfirm", {
                    required: true,
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "비밀번호가 일치하지 않습니다";
                      }
                    },
                  })}
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해주세요 "
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 text-gray-900"
                />
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.pwConfirm?.message}
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-violet-600 w-full px-8 py-3 font-semibold rounded-md  text-gray-50"
          >
            {submitting ? "Loading" : "Get one-time password"}
          </button>
        </form>
      </section>
    </Layout>
  );
}
