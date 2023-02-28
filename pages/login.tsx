import Layout from "@/components/layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function login() {
  const [validation, setValidation] = useState(false);
  const [email, setEmail] = useState("");
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isAvaliable = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      emailRegex.test(email) ? setValidation(true) : setValidation(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-50 text-gray-800 my-0 mx-auto">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-600">Dont have account?</p>
        <div className="my-6 space-y-4">
          <button
            onClick={() => signIn()}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-600" />
          <p className="px-3 text-gray-600">OR</p>
          <hr className="w-full text-gray-600" />
        </div>
        <form className="space-y-8 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                onChange={handleInput}
                onBlur={isAvaliable}
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력해 주세요"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              />
              <label
                className={validation ? "hidden" : "block text-sm text-red-600	"}
              >
                이메일 양식에 맞게 작성해 주세요
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`${
              validation ? "bg-violet-600" : " bg-slate-400"
            } w-full px-8 py-3 font-semibold rounded-md  text-gray-50`}
            disabled={validation ? false : true}
          >
            이메일로 계속하기
          </button>
        </form>
      </div>
    </Layout>
  );
}
