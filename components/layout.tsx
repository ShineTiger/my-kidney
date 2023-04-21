import { ReactNode, useState } from "react";
import Header from "./header";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const [view, setView] = useState(false);
  const showSideNavbar = () => {
    setView((preview) => !preview);
  };

  return (
    <div className="p-6  relative min-h-screen  dark:bg-gray-800 dark:text-gray-100 ">
      <Header title={"Main"} showSideNavbar={showSideNavbar} />
      <Sidebar viewState={view} showSideNavbar={showSideNavbar} />
      <main className="container mx-auto space-y-16 pt-6 px-4">
        <div>{children}</div>
      </main>
    </div>
  );
}
