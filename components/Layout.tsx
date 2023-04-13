import Navbar from "@/components/Navbar";
import Head from "next/head";

import Footer from "@/components/Footer";

import type { ReactNode } from "react";

export default function Layout({
  meta,
  children,
}: {
  meta?: { title?: string; description?: string };
  children: ReactNode;
}) {
  return (
    <>
      <Head>
        {meta?.title && <title>{meta.title}</title>}
        {meta?.description && (
          <meta name="description" content={meta?.description} />
        )}
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
