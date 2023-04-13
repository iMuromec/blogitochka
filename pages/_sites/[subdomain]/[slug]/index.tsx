import prisma from "@/lib/prisma";
import Layout from "@/components/Layout";
import EditJsParser from "@/components/editor/Parser";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { GetServerSideProps } from "next";
import type { Post } from "@prisma/client";

interface PostPageProps extends Post {
  title: string;
  content: any;
}
export default function PostPage({ post }: { post: PostPageProps }) {
  const meta = {
    title: post?.title || post?.slug,
    description: post?.title || post?.slug,
  };
  return (
    <Layout meta={meta}>
      <div className="relative">
        {post?.title && (
          <h1 className="w-full break-words whitespace-pre-wrap pb-5 mx-auto text-center appearance-none overflow-hidden text-5xl font-noraml focus:outline-none">
            {post.title}
          </h1>
        )}
        <div className="post-area">
          {post?.content?.blocks?.map((block: any) => {
            return <EditJsParser key={block.id} block={block} />;
          })}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  const subdomain = context.query.subdomain as string;

  const session = await getServerSession(context.req, context.res, authOptions);

  const post = await prisma.post.findFirst({
    where: {
      slug,
      author: {
        subdomain,
      },
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Only owner can view draft post
  if (!post?.published && post?.authorId !== session?.user?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
};
