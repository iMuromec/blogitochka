import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import usePost from "@/hooks/usePost";
import Editor from "@/components/editor/Editor";
import checkAccess from "@/lib/access";

import { GetServerSideProps } from "next";

export default function EditPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { post } = usePost(slug as string);

  const meta = {
    title: `${post?.title || post?.slug} | Редактирование`,
  };

  return (
    <Layout meta={meta}>
      {!post ? (
        <div className="flex justify-center">Загрузка...</div>
      ) : (
        <Editor post={post} />
      )}
    </Layout>
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
    props: {},
  };
};
