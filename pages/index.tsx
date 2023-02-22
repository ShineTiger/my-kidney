import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <section className="">
        <div className="grid gap-6 my-16 lg:grid-cols-3 ">
          <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900 shadow-lg">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-red-700 text-white">
              1
            </div>
            <p className="text-2xl font-semibold">
              <b>Nulla.</b>Nostrum, corrupti blanditiis. Illum, architecto?
            </p>
          </div>
          <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900 shadow-lg">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-red-700 text-white">
              2
            </div>
            <p className="text-2xl font-semibold">
              <b>Accusantium.</b>Vitae saepe atque neque sunt eius dolor veniam
              alias debitis?
            </p>
          </div>
          <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900 shadow-lg">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-red-700 text-white">
              3
            </div>
            <p className="text-2xl font-semibold">
              <b>Maxime.</b>Expedita temporibus culpa reprehenderit doloribus
              consectetur odio!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
