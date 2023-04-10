import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  showSideNavbar: () => void;
}

export default function Header({ title, showSideNavbar }: LayoutProps) {
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const router = useRouter();

  //마운팅 이후 모드전환 가능케 하도록 초기화 시킴
  useEffect(() => setMounted(true), []);

  return (
    <header className="container flex items-center justify-between h-16 px-4 mx-auto rounded dark:bg-gray-900">
      <Link href={"/"}>
        <h1>{title}</h1>
      </Link>
      <div className="items-center hidden space-x-8 lg:flex">
        <label
          htmlFor="DarkmodeToggle"
          className="inline-flex items-center space-x-4 cursor-pointer text-gray-800"
        >
          <span className="relative">
            <input
              id="DarkmodeToggle"
              type="checkbox"
              checked={mounted}
              className="hidden peer"
              onChange={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            />
            <div
              className={`w-10 h-6 rounded-full shadow-inner bg-gray-600 ${
                mounted &&
                (resolvedTheme === "dark" ? "peer-checked:bg-violet-600" : "")
              } `}
            ></div>
            <div
              className={`absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow ${
                mounted &&
                (resolvedTheme === "dark"
                  ? "peer-checked:right-0 peer-checked:left-auto"
                  : "")
              }  bg-gray-100`}
            ></div>
          </span>
        </label>
        <div className="space-x-4">
          <Link href={"/mypage"}>mypage</Link>
          <a rel="noopener noreferrer" href="#">
            Link
          </a>
          <a rel="noopener noreferrer" href="#">
            Link
          </a>
        </div>

        {!session && (
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="px-4 py-2 rounded-md text-gray-50 bg-violet-600 dark:bg-violet-400 dark:text-gray-900"
          >
            Sign in
          </button>
        )}
        {session?.user && (
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="px-4 py-2 rounded-md text-gray-50 bg-violet-600 dark:bg-violet-400 dark:text-gray-900"
          >
            Sign out
          </button>
        )}
      </div>
      <button
        onClick={showSideNavbar}
        className="flex items-center justify-center p-2 lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 dark:text-gray-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </header>
  );
}
