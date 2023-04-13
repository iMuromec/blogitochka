import { useState, useRef } from "react";

import Searchbar from "@/components/Searchbar";
import Pagination from "@/components/Pagination";
import Header from "@/components/lk/Header";
import PostItem from "@/components/lk/PostItem";
import SidebarLayout from "@/components/lk/SidebarLayout";
import NewPostButton from "@/components/lk/NewPostButton";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

import usePosts from "@/hooks/usePosts";
import useSearch from "@/hooks/useSearch";
import checkAccess from "@/lib/access";

import { Post } from "@prisma/client";
import { GetServerSideProps } from "next";

export default function Posts() {
  const limit = 10;
  const searchRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    posts,
    totalPages,
    loading,
    mutate: mutatePosts,
  } = usePosts({
    user: true,
    limit,
    currentPage,
  });

  const { trigger: triggerSearch } = useSearch();

  async function handleSearch() {
    const posts = await triggerSearch({
      limit,
      currentPage: 1,
      search: searchRef?.current?.value,
      user: true,
    });

    mutatePosts(posts, { revalidate: false });
    setCurrentPage(1);
  }

  return (
    <SidebarLayout title="Записи">
      <Header heading="Записи">
        <Searchbar searchRef={searchRef} handleSearch={handleSearch} />
        <NewPostButton />
      </Header>
      {loading ? (
        <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 my-4">
          {[...Array(limit)].map((_, i) => (
            <PostItem.Skeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {posts.length ? (
            <>
              <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 my-4">
                {posts.map((post: Post) => (
                  <PostItem
                    key={post.slug}
                    post={post}
                    refetchPosts={mutatePosts}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <EmptyPlaceholder search={searchRef?.current?.value} />
          )}
        </>
      )}
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
    props: {},
  };
};
