import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  viewState: boolean;
  showSideNavbar: () => void;
}

export default function Sidebar({ viewState, showSideNavbar }: NavbarProps) {
  const { data: session } = useSession();

  return (
    <>
      <nav
        id="sidenav-7"
        className={`${
          viewState ? "" : "hidden"
        } lg:hidden fixed top-0 right-0 z-50 h-screen w-60 overflow-hidden bg-white shadow-lg dark:bg-zinc-800 dark:shadow-dark-outer`}
      >
        <div className="absolute left-8 top-8 z-10">
          <button onClick={showSideNavbar} className="cursor-pointer">
            닫기
          </button>
        </div>
        <ul className="relative list-none pt-20 px-[0.2rem]">
          <li className="relative">
            <Link
              href={session ? "/posts/upload" : "/login"}
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-4 px-6 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            >
              <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"></span>
              <span className="text-violet-600">글쓰기</span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href={"/"}
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-4 px-6 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            >
              <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"></span>
              <span>메인</span>
            </Link>
          </li>
          <li className="relative">
            {session ? (
              <Link
                href="/mypage"
                className="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-4 px-6 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              >
                <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"></span>
                <span>마이 페이지</span>
                <span className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"></span>
              </Link>
            ) : (
              <Link
                href={"/login"}
                className="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-4 px-6 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              >
                <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"></span>
                <span>로그인</span>
                <span className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"></span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {viewState ? (
        <div
          onClick={showSideNavbar}
          className=" w-full h-full fixed top-0 left-0 bg-black/20 "
        ></div>
      ) : (
        ""
      )}
    </>
  );
}
