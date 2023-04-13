import useSWR, { Fetcher } from "swr";

import { Post } from "@prisma/client";

const fetcher: Fetcher<Post, string> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function usePost(slug: string) {
  const url = `/api/posts?slug=${slug}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    post: data,
    loading: isLoading,
    isError: error,
  };
}
