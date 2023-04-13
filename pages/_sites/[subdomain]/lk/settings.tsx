import Header from "@/components/lk/Header";
import SidebarLayout from "@/components/lk/SidebarLayout";
import UsernameForm from "@/components/lk/UsernameForm";
import SubdomainForm from "@/components/lk/SubdomainForm";

import checkAccess from "@/lib/access";

import { GetServerSideProps } from "next";

export default function Settings({ host }: { host: string }) {
  return (
    <SidebarLayout title="Настройки">
      <div className="grid items-start">
        <Header heading="Настройки" />
        <div className="grid gap-10 my-4">
          <UsernameForm />
          <SubdomainForm host={host} />
        </div>
      </div>
    </SidebarLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const accessDenied = await checkAccess(req, res, query.subdomain as string);

  if (accessDenied) {
    return {
      redirect: {
        destination: accessDenied.destination,
        permanent: false,
      },
    };
  }

  return {
    props: { host: process.env.HOST },
  };
};
