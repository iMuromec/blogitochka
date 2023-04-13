import Image from "next/image";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import ServicePage from "@/components/ServicePage";
import SubdomainForm from "@/components/lk/SubdomainForm";
import { getSigninUrl } from "@/lib/utils";
import { hostSite } from "@/config/host";

import { GetServerSideProps } from "next";

export default function NewSitePage({ host }: { host: string }) {
  return (
    <ServicePage
      meta={{ title: `Создать новый ${hostSite.name}` }}
      withLogo={false}
      withBg={true}
    >
      <div className="flex justify-center gap-2">
        <span className="text-left text-2xl font-normal">
          {`Создать ${hostSite.name}`}
        </span>
        <Image
          src={hostSite.logoSrc}
          alt={hostSite.name}
          width={50}
          height={50}
          className="h-7 w-auto mt-1"
        />
      </div>

      <SubdomainForm
        newSite={true}
        className="new-site shadow-lg shadow-gray-800/50 pt-5 bg-white"
        host={host}
      />
    </ServicePage>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    const destination = getSigninUrl("/new-site", context.req.headers.host);
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  if (session?.user?.site) {
    return {
      redirect: {
        destination: `${session?.user?.site || ""}/lk`,
        permanent: false,
      },
    };
  }

  return {
    props: { host: process.env.HOST },
  };
};
