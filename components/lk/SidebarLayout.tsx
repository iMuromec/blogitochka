import Head from "next/head";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/lk/Sidebar";

import type { ReactNode } from "react";

export default function SidebarLayout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title && `${title} - ЛК`}</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grid gap-12 md:grid-cols-[200px_1fr] px-6 flex-grow">
          <aside className="hidden w-[200px] flex-col md:flex mt-2">
            <Sidebar />
          </aside>
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
