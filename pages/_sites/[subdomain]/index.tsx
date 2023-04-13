import { useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import Searchbar from "@/components/Searchbar";
import Pagination from "@/components/Pagination";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

import prisma from "@/lib/prisma";
import { cleanHtml } from "@/lib/utils";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";

import { Post, Site } from "@prisma/client";
import { GetServerSideProps } from "next";

interface IndexPageProps {
  posts: Post[];
  totalPosts: number;
  site: Site;
}
export default function IndexPage({
  posts: pagePosts,
  totalPosts,
  site,
}: IndexPageProps) {
  const limit = 10;
  const siteDesc = DOMPurify.sanitize(
    marked.parse(cleanHtml(site?.description || ""))
  );

  const searchRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState(pagePosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalPosts / limit));

  const { trigger: triggerSearch } = useSearch();
  const { trigger: triggerPagination } = usePagination();

  async function handleSearch() {
    const data = await triggerSearch({
      limit,
      currentPage: 1,
      search: searchRef?.current?.value,
    });

    setPosts(data.posts);
    setTotalPages(Math.ceil(data.total / limit));
    setCurrentPage(1);
  }

  async function handlePagination(page: number) {
    setCurrentPage(page);

    const data = await triggerPagination({
      limit,
      currentPage: page,
    });

    setPosts(data.posts);
  }

  return (
    <Layout
      meta={{
        title: `Записи в блоге ${site?.name}`,
        description: site?.description || `Записи в блоге ${site?.name}`,
      }}
    >
      <div className="container gap-5 flex flex-col w-full px-5 mx-auto">
        <div
          className="site-description space-y-4 mb-4"
          dangerouslySetInnerHTML={{
            __html: siteDesc,
          }}
        />
        <Searchbar
          searchRef={searchRef}
          handleSearch={handleSearch}
          className="md:w-full"
        />

        <hr className="border-slate-200" />

        {posts?.length ? (
          <>
            <div className="columns-1 md:columns-2 gap-3">
              {posts.map((post: Post, index: number) => (
                <PostItem key={post.slug} post={post} index={index} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={handlePagination}
              />
            </div>
          </>
        ) : (
          <EmptyPlaceholder search={searchRef?.current?.value} />
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.subdomain) {
    return {
      notFound: true,
    };
  }

  const subdomain = params.subdomain as string;

  const where = {
    author: {
      subdomain,
    },
    published: true,
  };

  const [site, total, posts] = await prisma.$transaction([
    prisma.site.findFirst({
      select: {
        name: true,
        description: true,
      },
      where: { subdomain },
    }),
    prisma.post.count({
      where,
    }),
    prisma.post.findMany({
      select: {
        slug: true,
        title: true,
        image: true,
        createdAt: true,
      },
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: 0,
      take: 10,
    }),
  ]);

  if (!site) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      totalPosts: total,
      site,
    },
  };
};
