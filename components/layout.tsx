import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header title={"홈"} />
      <main>
        <div className="container mx-auto space-y-16">{children}</div>
      </main>
    </>
  );
}
