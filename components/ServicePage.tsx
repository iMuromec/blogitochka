import Head from "next/head";

import LogoHost from "@/components/LogoHost";
import Favicon from "@/components/Favicon";

import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

export default function Layout({
  withLogo = true,
  withBg = false,
  meta,
  children,
  className,
}: {
  withLogo?: boolean;
  withBg?: boolean;
  meta?: { title?: string; description?: string };
  children?: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Head>
        {meta?.title && <title>{meta.title}</title>}
        {meta?.description && (
          <meta name="description" content={meta?.description} />
        )}
        <Favicon />
      </Head>
      <div
        className={`${
          withBg && "bg-[url('/static/background.jpg')] bg-cover h-screen"
        }`}
      >
        <div
          className={cn(
            "flex flex-col gap-7 pt-32 max-w-[400px] mx-auto px-2",
            className
          )}
        >
          {withLogo && <LogoHost />}
          {children}
        </div>
      </div>
    </>
  );
}
