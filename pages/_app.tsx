import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
      <div className="p-6 space-y-8">
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </div>
    </div>
  );
}
