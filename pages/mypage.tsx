import Layout from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";

export default function mypage() {
  const { data: session } = useSession();
  const image = JSON.stringify(session?.user?.image);
  if (session) {
    return (
      <Layout>
        <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img
              src={image.replace(/\"/gi, "")}
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start"
            />
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-center md:text-left">
                Name
              </h4>
              <p className="dark:text-gray-400 text-center md:text-left">
                <span>{JSON.stringify(session.user?.name)}</span>
              </p>
              <h4 className="mt-6 text-lg font-semibold text-center md:text-left">
                Email
              </h4>
              <p className="dark:text-gray-400 text-center md:text-left">
                <span>{JSON.stringify(session.user?.email)}</span>
              </p>
              <button
                onClick={() => signOut()}
                className="mt-4 rounded-md py-2 border border-violet-600 text-violet-600  "
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <Layout>"로그인하세요"</Layout>;
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
