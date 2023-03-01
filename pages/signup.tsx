import Layout from "@/components/layout";
import { useForm } from "react-hook-form";

interface formType {
  email: string;
  username: string;
  password: string;
}

export default function signup() {
  const {
    register,
    formState: { errors },
  } = useForm<formType>({ mode: "onChange" });
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  return (
    <Layout>
      <section className="p-6 bg-gray-100 text-gray-900">
        <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
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
                    {errors.email &&
                      errors.email.message &&
                      errors.email.message}
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
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요 "
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="website" className="text-sm">
                  Password Confirm
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시한번 입력해주세요 "
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 text-gray-900"
                />
              </div>
            </div>
          </fieldset>

          <button>완료</button>
        </form>
      </section>
    </Layout>
  );
}
