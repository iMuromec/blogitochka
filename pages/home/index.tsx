import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import Footer from "@/components/Footer";
import Favicon from "@/components/Favicon";
import Button from "@/ui/button";
import { hostSite } from "@/config/host";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>{`Создать ${hostSite.name}`}</title>
        <meta
          name="description"
          content={`Создать свой блог на сайте "${hostSite.name}"`}
        />
        <Favicon />
      </Head>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="flex flex-col tablet:flex-row gap-5 justify-center items-center">
          <Link href="/new-site" className="inline-block ">
            <Button className="text-center text-7xl md:text-8xl px-10 py-20 rounded-lg font-normal shadow-lg shadow-gray-800/50">
              Создать
            </Button>
          </Link>
          <div className="inline-block pl-3 pt-5">
            <span className="text-left text-8xl font-normal">
              {hostSite.name}
            </span>
            <Image
              src={hostSite.logoSrc}
              alt={hostSite.name}
              width={50}
              height={50}
              className="inline-block h-10 w-auto mb-7 ml-2"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.site) {
    return {
      redirect: {
        destination: `${session?.user?.site}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
